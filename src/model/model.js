import * as tf from '@tensorflow/tfjs';
import { preprocessImage } from './imageProcessing';

const MODEL_PATH = '../recognizer_model/model.json';
const MathExpr = [ '!', '(', ')', '+', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '=', 'X', 'cos', 'div', 'i', 'j', 'k', 'log', 'pi', 'sin', 'sqrt', 'tan', 'times', 'u', 'v', 'y', 'z' ];

export async function loadModel() {
    const model = await tf.loadLayersModel(MODEL_PATH);
    console.log("Model loaded successfully.");
    return model;
}

export async function predict(imageData) {
    const model = await loadModel();
    const img = await preprocessImage(imageData);

    const prediction = model.predict(img).dataSync();
    for (let i = 0; i < prediction.length; i++) {
        console.log(MathExpr[i], ":", Math.round(prediction[i] * 100) + "%");
    }
    const result = MathExpr[prediction.indexOf(Math.max(...prediction))];
    console.log("Prediction: ", result);
}
