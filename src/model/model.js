import * as tf from '@tensorflow/tfjs';

const MODEL_PATH = '../recognizer_model/model.json';

export async function loadModel() {
    const model = await tf.loadLayersModel(MODEL_PATH);
    model.summary();
    console.log("Model loaded successfully.");
}
