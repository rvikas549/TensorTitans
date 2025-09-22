# app/ml_service.py
import tensorflow as tf
import numpy as np

# --- Load Models ---
# Load the models once when the application starts
SPECIES_MODEL = tf.keras.models.load_model('models/species_model.h5')
COW_BREED_MODEL = tf.keras.models.load_model('models/cow_breed_model.h5')

# --- Define Labels ---
SPECIES_LABELS = ['Buffalo', 'Cow']
COW_BREED_LABELS = ['Red Sindhi', 'Sahiwal', 'Gir', 'Fresian']

def predict_breed(processed_image):
    """
    Takes a preprocessed image and returns the classification results.
    """
    # Stage 1: Predict Species
    species_prediction = SPECIES_MODEL.predict(processed_image)[0]
    species_index = np.argmax(species_prediction)
    predicted_species = SPECIES_LABELS[species_index]

    # Stage 2: Predict Breed based on Species
    if predicted_species == "Cow":
        breed_prediction = COW_BREED_MODEL.predict(processed_image)[0]
        breed_labels = COW_BREED_LABELS
    else:
        # Handle Buffalo case (can be expanded later)
        return {"species": "Buffalo", "message": "Buffalo breed model is not yet implemented."}

    # Format the results
    top_3_indices = np.argsort(breed_prediction)[-3:][::-1]
    
    top_prediction = {
        "breed": breed_labels[top_3_indices[0]],
        "confidence": round(float(breed_prediction[top_3_indices[0]]) * 100, 2)
    }

    other_predictions = [
        {
            "breed": breed_labels[i],
            "confidence": round(float(breed_prediction[i]) * 100, 2)
        } for i in top_3_indices[1:]
    ]

    return {
        "species": predicted_species,
        "top_prediction": top_prediction,
        "other_predictions": other_predictions
    }