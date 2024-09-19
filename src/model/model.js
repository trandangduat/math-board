import * as tf from '@tensorflow/tfjs';
import { extractExpressions, preprocessImage } from './imageProcessing';

const MODEL_PATH = 'recognizer_model/model.json';
const MathExpr = [ '!', '(', ')', '+', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '=', 'X', 'cos', 'div', 'i', 'j', 'k', 'log', 'pi', 'sin', 'sqrt', 'tan', 'times', 'u', 'v', 'y', 'z' ];

let model = null;

export async function loadModel() {
    model = await tf.loadLayersModel(MODEL_PATH);
}

export async function predict(imageData) {
    if (!model) {
        console.error("Model is not loaded yet.");
        return;
    }
    const img = await preprocessImage(imageData);
    const prediction = model.predict(img).dataSync();
    const result = MathExpr[prediction.indexOf(Math.max(...prediction))];
    // for (let i = 0; i < prediction.length; i++) {
    //     console.log(MathExpr[i], ":", Math.round(prediction[i] * 100) + "%");
    // }
    // console.log("Prediction: ", result);
    return result;
}

export async function predictExpressions(imageData) {
    const expressionImages = await extractExpressions(imageData);
    let T = performance.now();
    let expressions = "";
    for (let imgData of expressionImages) {
        expressions += await predict(imgData);
    }
    console.log("Time taken: ", performance.now() - T);
    return expressions;
}
