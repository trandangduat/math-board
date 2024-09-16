import * as tf from '@tensorflow/tfjs';
import { Jimp } from 'jimp';

const IMAGE_SIZE = 45;

// the order of the directions:
// 7 0 1
// 6   2
// 5 4 3
const dir = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];

function cellId (row, col) {
    return row * IMAGE_SIZE + col;
}

function transitions (imgArray, row, col) {
    let count = 0;
    let prev = imgArray[cellId(row + dir[7][0], col + dir[7][1])];
    for (let i = 0; i < dir.length; i++) {
        let nRow = row + dir[i][0];
        let nCol = col + dir[i][1];
        if (imgArray[cellId(nRow, nCol)] !== prev && prev === 0) {
            count++;
        }
        prev = imgArray[cellId(nRow, nCol)];
    }
    return count;
}

function countBlacks (imgArray, row, col) {
    let count = 0;
    for (let i = 0; i < dir.length; i++) {
        let nRow = row + dir[i][0];
        let nCol = col + dir[i][1];
        if (imgArray[cellId(nRow, nCol)]) {
            count++;
        }
    }
    return count;
}

/**
 * Thinning using Zhang-Suen algorithm
 * Input: flatten binary image array with white pixel = 1, black pixel = 0
 */
function thinning (imgArray) {
    let turn = 0;
    const arr = [...imgArray].map(x => 1 - x); // convert to white pixel = 0, black pixel = 1
    while (true) {
        let changed = false;
        let toWhite = [];
        for (let i = 1; i < IMAGE_SIZE - 1; i++) {
            for (let j = 1; j < IMAGE_SIZE - 1; j++) {
                if (arr[cellId(i, j)] === 0) continue;
                let t = transitions(arr, i, j);
                let c = countBlacks(arr, i, j);
                const p = [];
                for (let t = 0; t < 8; t += 2) {
                    p[t] = arr[cellId(i + dir[t][0], j + dir[t][1])];
                }
                if (2 <= c && c <= 6 && t === 1) {
                    if (turn === 0 && p[0] * p[2] * p[4] === 0 && p[2] * p[4] * p[6] === 0) {
                        toWhite.push(cellId(i, j));
                    }
                    if (turn === 1 && p[0] * p[2] * p[6] === 0 && p[0] * p[4] * p[6] === 0) {
                        toWhite.push(cellId(i, j));
                    }
                }
            }
        }
        changed |= toWhite.length > 0;
        for (const id of toWhite) {
            arr[id] = 0;
        }
        turn = 1 - turn;
        if (!changed) break;
    }
    return arr.map(x => 1 - x);
}

const text_input = document.getElementById("text_input");
const text_output = document.getElementById("text_output");

export async function preprocessImage (imageData) {
    const img = await Jimp.fromBitmap(imageData);
    img.resize({ w: IMAGE_SIZE, h: IMAGE_SIZE });
    img.greyscale();
    const imgArray = [];
    for (let i = 0; i < img.bitmap.data.length; i+= 4) {
        const value = (img.bitmap.data[i] * 2 >= 255) ? 1 : 0; // thresholding
        imgArray.push(value);
    }
    for (let i = 0; i < IMAGE_SIZE; i++) {
        let str = "";
        for (let j = 0; j < IMAGE_SIZE; j++) {
            str += imgArray[i * IMAGE_SIZE + j] ? "1" : "0";
        }
        text_input.value += str + "\n";
    }
    const imgArrayThinned = thinning(imgArray);
    for (let i = 0; i < IMAGE_SIZE; i++) {
        let str = "";
        for (let j = 0; j < IMAGE_SIZE; j++) {
            str += imgArrayThinned[i * IMAGE_SIZE + j] ? "1" : "0";
        }
        text_output.value += str + "\n";
    }
    return tf.tensor(imgArrayThinned, [1, IMAGE_SIZE, IMAGE_SIZE, 1]);
}
