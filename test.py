# -*- coding: utf-8 -*-

import requests
import json

resp = requests.post(
    "http://682d-35-221-221-44.ngrok-free.app",
    json={
        "task": "en-th",
        "text": "This engineering project develops a system for detecting. and classifying plant disease from photographs of melon leaves using deep learning. The system uses NVIDIA Jetson Nano to process images from cameras in the greenhouse. To develop a deep learning model, the images of the melon leaves from the greenhouses were collected. and the melon leaf disease were labelled. Then use the dataset to train the object detector model. which will be able to detect disease in melon leaves. and when the system detects a disease, the caretaker will be notified of the issue through the LINE application. In the process of selecting a deep learning model to be deployed on the Jetson Nano."
        }
    )

print(resp.json())