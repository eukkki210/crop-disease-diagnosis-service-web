import base64
import logging
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import json
import os
from PIL import Image
import numpy as np
import object_detection.detect as od
import image_captioning.generate_caption_DI as gc
import requests

app = Flask(__name__)

app.logger.setLevel(logging.DEBUG)
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
app.logger.addHandler(stream_handler)

static_dir = './object_detection/data/images/'
data_path = './data'
server_url = 'http://localhost:3000'

CORS(app, resources={r"/*": {"origins": {server_url}}})


@app.route('/upload', methods=['POST'])
def diagnose_image():
    try:
        if 'image' not in request.files:
            return 'No image provided', 400

        image = request.files['image']
        if image.filename == '':
            return jsonify({"error": "No image provided"}), 400

        if image:
            image.save(os.path.join(static_dir, 'sample.jpg'))

        od_opt = od.parse_opt()
        od.main(od_opt)

        with open('object_detection/runs/detect/exp/sample.jpg', 'rb') as img:
            detection_result = base64.b64encode(img.read())

        caption_result = " ".join(
            gc.generate_captions(static_dir + 'sample.jpg')[0])

        model_result = {
            "captions": caption_result,
            "detections": detection_result.decode()
        }

        with open(data_path + "/data.json", "w") as fjson:
            result = json.dumps(model_result)
            fjson.write(result)

        return send_file(data_path + '/data.json', as_attachment=True)
    except Exception as e:
        app.logger.error('이미지 업로드 및 데이터 가져오는 중 오류 발생: %s', str(e))
        return '이미지 업로드 및 데이터 가져오는 중 오류 발생', 500

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
