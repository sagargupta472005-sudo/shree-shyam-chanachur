from flask import Flask, request, send_file, jsonify
import os
import io
from PIL import Image

app = Flask(__name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/resize", methods=["POST"])
def resize_image():
    """Resize an uploaded image.
    Expected form‑data:
      - image: the image file
      - width: target width (int)
      - height: target height (int)
    Returns the resized image file.
    """
    if "image" not in request.files:
        return jsonify(error="No image file provided"), 400
    img_file = request.files["image"]
    try:
        width = int(request.form.get("width", 0))
        height = int(request.form.get("height", 0))
        if width <= 0 or height <= 0:
            raise ValueError
    except (ValueError, TypeError):
        return jsonify(error="Invalid width or height"), 400
    try:
        img = Image.open(img_file.stream)
        img = img.convert("RGB")
        img_resized = img.resize((width, height), Image.LANCZOS)
        buf = io.BytesIO()
        img_resized.save(buf, format="JPEG")
        buf.seek(0)
        return send_file(buf, mimetype="image/jpeg")
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route("/health", methods=["GET"])
def health():
    return "OK", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
