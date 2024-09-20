import * as tf from '@tensorflow/tfjs';
import { extractExpressions, preprocessImage } from './imageProcessing';
import Mexp from 'math-expression-evaluator';
const mexp = new Mexp();

const MODEL_PATH = 'recognizer_model/model.json';
const MathExpr = [ '!', '(', ')', '+', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '=', 'X', 'cos', '/', 'i', 'j', 'k', 'log', 'pi', 'sin', 'sqrt', 'tan', '*', 'u', 'v', 'y', 'z' ];

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
    const results = [];
    for (let i = 0; i < prediction.length; i++) {
        if (prediction[i] >= 0.05) {
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

function getAllCombinations(expressions, currentString, currentConfidence, results) {
    let index = currentString.length;
    if (index === expressions.length) {
        try {
            results.push({
                expression: currentString,
                confidence: currentConfidence,
                evalResult: eval(currentString)
            });
        } catch (e) {
            // console.warn("Cannot evaluate expressions: ", currentString);
        }
        return;
    }
    expressions[index].forEach((expr) => {
        getAllCombinations(expressions, currentString + expr.expression, currentConfidence * expr.confidence, results);
    });
}

export async function predictExpressions(imageData) {
    const expressionImages = await extractExpressions(imageData);
    let T = performance.now();

    let expressions = [];
    for (let imgData of expressionImages) {
        expressions.push(await predict(imgData));
    }
    console.log(expressions);
    let results = [];
    getAllCombinations(expressions, "", 1, results);

    console.log("Time taken: ", Math.round(performance.now() - T), "ms");
    return results.sort((a, b) => b.confidence - a.confidence);
}
