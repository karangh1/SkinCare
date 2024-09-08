from keras.models import load_model
from keras.preprocessing import image
from keras.optimizers import Adam
import numpy as np
import pickle
import sys

# Define the optimizer with the desired learning rate
# optimizer = Adam(learning_rate=0.001)
class_names=["Acne and Rosacea Photos","Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions","Eczema","Melanoma Skin Cancer Nevi and Moles","Psoriasis pictures Lichen Planus and related diseases","Tinea Ringworm Candidiasis and other Fungal Infections","Urticaria Hives","Nail Fungus and other Nail Disease"]
# Load the model 
model1 = load_model('VGG16.h5')
print("done")
# model1.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy'])

# Load the image
img_path = f'upload/{sys.argv[1]}'
img = image.load_img(img_path, target_size=(32, 32))    # Resize to match model's input shape
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array = img_array / 255.0 

# Make predictions
predictions = model1.predict(img_array)

predicted_class = np.argmax(predictions)
predicted_letter = class_names[predicted_class]
print( predicted_letter)
