# app/routes.py
from flask import current_app as app, request, jsonify
from .utils import preprocess_image
from .ml_service import predict_breed

@app.route("/api/predict", methods=["POST"])
def handle_prediction():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # 1. Preprocess the image using the utility function
        processed_image = preprocess_image(file)
        
        # 2. Get predictions from the ML service
        prediction_results = predict_breed(processed_image)
        
        # 3. Return the results as JSON
        return jsonify(prediction_results)

    except Exception as e:
        return jsonify({"error": str(e)}), 500