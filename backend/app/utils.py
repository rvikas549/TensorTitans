import numpy as np
from PIL import Image
from tensorflow.keras.preprocessing.image import img_to_array

IMG_SIZE = (224, 224)

def preprocess_image(image_file):
    """
    Loads an image file, resizes it, and normalizes it for the model.
    """
    image = Image.open(image_file.stream).convert("RGB")
    image = image.resize(IMG_SIZE)
    image_array = img_to_array(image) / 255.0
    return np.expand_dims(image_array, axis=0)