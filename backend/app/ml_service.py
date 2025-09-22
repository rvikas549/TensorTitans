import tensorflow as tf
import numpy as np

# --- 1. Load the single, unified model ---
try:
    BREED_MODEL = tf.keras.models.load_model('models/breed_model.h5')
    print("✅ Unified breed model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")

# --- 2. Define the class labels and the species mapping dictionary ---
# This MUST match the `class_names` from your training script
CLASS_NAMES = ['Hallikar', 'Kankrej', 'Murrah', 'Nili_Ravi', 'Red_Sindhi', 'Toda']

BREED_TO_SPECIES = {
    "Murrah": "Buffalo",
    "Nili_Ravi": "Buffalo",
    "Toda": "Buffalo",
    "Hallikar": "Cow",
    "Kankrej": "Cow",
    "Red_Sindhi": "Cow"
}

def get_prediction(processed_image):
    """
    Takes a preprocessed image and returns the classification results
    using the single, unified model.
    """
    
    # --- Stage 1: Predict the breed directly ---
    breed_pred_raw = BREED_MODEL.predict(processed_image)[0]
    
    # Get top 3 breed predictions
    top_3_indices = np.argsort(breed_pred_raw)[-3:][::-1]
    
    # --- Stage 2: Look up the species and format results ---
    top_breed_index = top_3_indices[0]
    top_breed_name = CLASS_NAMES[top_breed_index]
    
    predicted_species = BREED_TO_SPECIES.get(top_breed_name, "Unknown") # Safely get species

    top_prediction = {
        "breed": top_breed_name,
        "confidence": round(float(breed_pred_raw[top_breed_index]) * 100, 2)
    }

    other_predictions = [
        {
            "breed": CLASS_NAMES[i],
            "confidence": round(float(breed_pred_raw[i]) * 100, 2)
        } for i in top_3_indices[1:]
    ]

    # --- 3. Format the final JSON response ---
    return {
        "species": predicted_species,
        "top_prediction": top_prediction,
        "other_predictions": other_predictions
    }