import tensorflow as tf
import numpy as np

# --- 1. Load all three models when the application starts ---
try:
    SPECIES_MODEL = tf.keras.models.load_model('models/species_model.h5')
    COW_MODEL = tf.keras.models.load_model('models/cow_model.h5')
    BUFFALO_MODEL = tf.keras.models.load_model('models/buffalo_model.h5')
    print("✅ Models loaded successfully!")
except Exception as e:
    print(f"❌ Error loading models: {e}")

# --- 2. Define the class labels ---
# This MUST match the output of `train_data.class_indices` from your notebook
SPECIES_LABELS = ["Cow", "Buffalo"]
COW_BREED_LABELS = ['Sahiwal', 'fresian', 'kankarej', 'Red sindhi', 'Tharparkar']
BUFFALO_BREED_LABELS = ['Khundi', 'Murrah', 'Nagpuri', 'Neli ravi', 'Surti']


def get_prediction(processed_image):
    """
    Takes a preprocessed image and returns the full classification results.
    """
    
    # --- Stage 1: Predict Species ---
    species_pred_raw = SPECIES_MODEL.predict(processed_image)[0]
    species_index = np.argmax(species_pred_raw)
    predicted_species = SPECIES_LABELS[species_index]

    # --- Stage 2: Predict Breed based on Species ---
    if predicted_species == "Cow":
        breed_pred_raw = COW_MODEL.predict(processed_image)[0]
        breed_labels = COW_BREED_LABELS
    else: # It's a Buffalo
        breed_pred_raw = BUFFALO_MODEL.predict(processed_image)[0]
        breed_labels = BUFFALO_BREED_LABELS
        
    # Get top 3 breed predictions
    top_3_indices = np.argsort(breed_pred_raw)[-3:][::-1]
    
    top_prediction = {
        "breed": breed_labels[top_3_indices[0]],
        "confidence": round(float(breed_pred_raw[top_3_indices[0]]) * 100, 2)
    }

    other_predictions = [
        {
            "breed": breed_labels[i],
            "confidence": round(float(breed_pred_raw[i]) * 100, 2)
        } for i in top_3_indices[1:]
    ]

    # --- 3. Format the final JSON response ---
    return {
        "species": predicted_species,
        "top_prediction": top_prediction,
        "other_predictions": other_predictions
    }