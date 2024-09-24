import * as tf from '@tensorflow/tfjs';
import { extractExpressions, preprocessImage } from './imageProcessing';

const MODEL_PATH = 'recognizer_model/model.json';
const MathExpr = [ '!', '(', ')', '+', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '=', 'X', 'cos', '/', 'i', 'j', 'k', 'log', 'pi', 'sin', 'sqrt', 'tan', '*', 'u', 'v', 'y', 'z' ];

let model = null;

export async function loadModel() {
    model = await tf.loadLayersModel(MODEL_PATH);
    // fake prediction to warm up the model
    const img = await preprocessImage(new ImageData(1, 1));
    const prediction = model.predict(img).dataSync();
}

export async function predict(imageData) {
    if (!model) {
        console.error("Model is not loaded yet.");
        return;
    }
    const img = await preprocessImage(imageData);
    const prediction = model.predict(img).dataSync();
    const results = [];
    for (let i = 0; i < prediction.length; i++) {
        if (prediction[i] >= 0.1) {
            results.push({
                expression: MathExpr[i],
                confidence: prediction[i]
            });
            if (MathExpr[i] === 'X') {
                results.push({
                    expression: '*',
                    confidence: prediction[i]
                });
            }
        }
    }
    return results;
}

function removeEqualSigns(expressionsString) {
    let result = "";
    for (const c of expressionsString) {
        if (c !== '=') {
            result += c;
        }
    }
    return result;
}

function getAllCombinations(expressions, currentString, currentConfidence, results) {
    let index = currentString.length;
    if (index === expressions.length) {
        currentString = removeEqualSigns(currentString);
        try {
            results.push({
                expression: currentString,
                confidence: currentConfidence,
                evalResult: eval(currentString)
            });
        } catch (e) {
            console.warn("Cannot evaluate expressions: ", currentString);
        }
        return;
    }
    //TODO: Fix undefined forEach happens when there are 2 expressions in last index
    expressions[index].forEach((expr) => {
        getAllCombinations(expressions, currentString + expr.expression, currentConfidence * expr.confidence, results);
    });
}

export async function predictExpressions(imageData) {
    let T = performance.now();
    const expressionImages = await extractExpressions(imageData);
    console.debug("Extracted expressions time: ", Math.round(performance.now() - T), "ms");

    T = performance.now();
    let expressions = [];
    for (let imgData of expressionImages) {
        expressions.push(await predict(imgData));
    }
    console.log(expressions);
    let results = [];
    getAllCombinations(expressions, "", 1, results);
    console.debug("Predict time: ", Math.round(performance.now() - T), "ms");

    return results.sort((a, b) => b.confidence - a.confidence);
}
