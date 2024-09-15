import * as tf from '@tensorflow/tfjs';
import { Jimp } from 'jimp';

const IMAGE_SIZE = 45;
const MODEL_PATH = '../recognizer_model/model.json';
const MathExpr = [ '!', '(', ')', '+', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '=', 'X', 'cos', 'div', 'i', 'j', 'k', 'log', 'pi', 'sin', 'sqrt', 'tan', 'times', 'u', 'v', 'y', 'z' ];

export async function loadModel() {
    const model = await tf.loadLayersModel(MODEL_PATH);
    // model.summary();
    console.log("Model loaded successfully.");
    return model;
}

async function preprocessImage (imageData) {
    const img = await Jimp.fromBitmap(imageData);
    img.resize({ w: IMAGE_SIZE, h: IMAGE_SIZE });
    img.greyscale();
    const imgArray = [];
    for (let i = 0; i < img.bitmap.data.length; i+= 4) {
        const value = (img.bitmap.data[i] * 2 >= 255) ? 1 : 0;
        imgArray.push(value);
    }
    return tf.tensor(imgArray, [1, IMAGE_SIZE, IMAGE_SIZE, 1]);
}

export async function predict(imageData) {
    const model = await loadModel();
    const img = await preprocessImage(imageData);

    const prediction = model.predict(img).dataSync();
    const result = MathExpr[prediction.indexOf(Math.max(...prediction))];
    console.log("Prediction: ", result);
}
