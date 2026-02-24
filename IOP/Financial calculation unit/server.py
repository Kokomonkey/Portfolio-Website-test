from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from PIL import Image
import io
import base64
import numpy as np

app = FastAPI()

# Allow your web frontend to talk to this backend
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Load the SAM model (this will download a ~1GB model the first time you run it)
print("Loading SAM model...")
sam_pipeline = pipeline("mask-generation", model="facebook/sam-vit-base", device=-1) # Use device=0 if you have an Nvidia GPU
print("Model loaded!")

# Global variables to store the current image and its state
current_image = None

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    global current_image
    # Read the uploaded image
    contents = await file.read()
    current_image = Image.open(io.BytesIO(contents)).convert("RGB")
    
    # Note: In a production app, we would calculate the embedding here and save it.
    # For this simple prototype, the Hugging Face pipeline handles it dynamically.
    return {"message": "Image uploaded successfully", "width": current_image.width, "height": current_image.height}

@app.post("/click")
async def process_click(x: int, y: int):
    global current_image
    if current_image is None:
        return {"error": "No image uploaded yet"}

    # Pass the image and the click coordinates to SAM
    # SAM takes points as [[[x, y]]]
    outputs = sam_pipeline(current_image, points=[[[x, y]]])
    
    # SAM returns multiple masks (e.g., whole building, just the roof, just the chimney)
    # Usually, the first mask [0] is the most accurate for the clicked level.
    best_mask = outputs[0]['mask'] # This is a True/False array
    
    # Convert the True/False mask into a semi-transparent blue image we can show on the web
    mask_image = Image.new('RGBA', current_image.size, (0, 0, 0, 0))
    blue_color = (0, 150, 255, 128) # RGBA: Semi-transparent blue
    
    # Apply the blue color wherever the mask is True
    mask_data = np.array(mask_image)
    mask_data[best_mask] = blue_color
    final_mask = Image.fromarray(mask_data)
    
    # Convert the mask image to a base64 string to send back to the web browser
    buffered = io.BytesIO()
    final_mask.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    
    return {"mask_base64": img_str}