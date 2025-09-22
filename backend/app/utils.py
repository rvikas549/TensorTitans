# app/utils.py
import numpy as np

def preprocess_image(image_file):
    """
    Preprocesses the uploaded image to be model-ready.
    """
    # Open the image file using Pillow
    from PIL import Image
    image = Image.open(image_file.stream).convert("RGB")
    
    # Resize and normalize
    image = image.resize((224, 224))
    image_array = np.array(image) / 255.0
    
    # Add a batch dimension
    return np.expand_dims(image_array, axis=0)