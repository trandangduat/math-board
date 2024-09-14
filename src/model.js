import * as tf from '@tensorflow/tfjs';
// import modelJson from './recognizer_model/model.json';
const modelJson = require('../dist/recognizer_model/model.json');

export async function loadModel() {
    model = await tf.loadLayersModel(modelJson);
    console.log('Model Loaded!');
}

function preprocessImage(image) {
    const tensor = tf.browser.fromPixels(image)
       .resizeNearestNeighbor([45, 45])  // Resize image to 45x45
       .mean(2)  // Convert to grayscale
       .expandDims(2)  // Add channel dimension
       .expandDims()  // Add batch dimension
       .div(255.0);  // Normalize to [0, 1]
    return tensor;
}

function predict() {
    const input = document.getElementById('upload').files[0];
    const img = new Image();
    img.src = URL.createObjectURL(input);
    img.onload = async function() {
        const preprocessed = preprocessImage(img);
        const prediction = model.predict(preprocessed);
        const result = prediction.arraySync();  // Get the prediction result
        document.getElementById('result').innerText = `Prediction: ${result}`;
    };
}
