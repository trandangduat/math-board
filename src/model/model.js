import * as tf from '@tensorflow/tfjs';
import { extractExpressions, preprocessImage } from './imageProcessing';

const MODEL_PATH = '../recognizer_model/model.json';
const MathExpr = [ '!', '(', ')', '+', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '=', 'X', 'cos', 'div', 'i', 'j', 'k', 'log', 'pi', 'sin', 'sqrt', 'tan', 'times', 'u', 'v', 'y', 'z' ];

let model = null;

export async function loadModel() {
    model = await tf.loadLayersModel(MODEL_PATH);
    console.log("Model loaded successfully.");
}

export async function predict(imageData) {
    if (!model) {
        console.error("Model is not loaded yet.");
    }

    const startPredict = Date.now();
    const img = await preprocessImage(imageData);

    const prediction = model.predict(img).dataSync();
    // for (let i = 0; i < prediction.length; i++) {
    //     console.log(MathExpr[i], ":", Math.round(prediction[i] * 100) + "%");
    // }
    const result = MathExpr[prediction.indexOf(Math.max(...prediction))];
    console.log("Prediction: ", result);
    console.log("Prediction time: ", Date.now() - startPredict, "ms");
}

export async function predictExpressions(imageData) {
    const expressionImages = await extractExpressions(imageData);
    for (let imgData of expressionImages) {
        predict(imgData);
    }
}
