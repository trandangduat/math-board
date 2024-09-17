import * as tf from '@tensorflow/tfjs';
import { Jimp } from 'jimp';
import { thinning } from './thinning';

const IMAGE_SIZE = 45;

const text_input = document.getElementById("text_input");
// const test_canvas = document.getElementById("test");
// const test_ctx = test_canvas.getContext("2d");

const dir = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, 1], [-1, -1], [1, -1]];

function dfs (arr, marked, i, j, comp) {
    if (i < 0 || j < 0 || i >= arr.length || j >= arr[0].length || marked[i][j] || arr[i][j] === 1) {
        return;
    }
    comp.push([i, j]);
    marked[i][j] = true;
    for (let d of dir) {
        dfs(arr, marked, i + d[0], j + d[1], comp);
    }
}

function updateText (arr) {
    text_input.value = "";
    for (let i = 0; i < arr.length; i++) {
        let str = "";
        for (let j = 0; j < arr[i].length; j++) {
            str += arr[i][j] ? "1" : "0";
        }
        text_input.value += str + "\n";
    }
}

export async function extractExpressions (imageData) {
    const img = await Jimp.fromBitmap(imageData);
    img.greyscale();
    const [width, height] = [img.bitmap.width, img.bitmap.height];

    const t = Date.now();

    let imgArray = [];
    let marked = [];
    let currentRow = [];
    let components = [];

    for (let i = 0; i < img.bitmap.data.length; i += 4) {
        currentRow.push((img.bitmap.data[i] * 2 >= 255) ? 1 : 0);
        if (currentRow.length === width) {
            imgArray.push(currentRow);
            marked.push(new Array(width).fill(false));
            currentRow = [];
        }
    }
    updateText(imgArray);
    for (let j = 0; j < width; j++) {
        for (let i = 0; i < height; i++) {
            if (imgArray[i][j] === 0 && !marked[i][j]) {
                const comp = [];
                dfs(imgArray, marked, i, j, comp);
                components.push(comp);
            }
        }
    }
    const expressionImagesData = [];
    console.log("Number of components: ", components.length);

    console.log("time elapsed: ", Date.now() - t, "ms");
    // const imgData = new ImageData(
    //     new Uint8ClampedArray(img.bitmap.data),
    //     img.bitmap.width,
    //     img.bitmap.height
    // );
    // test_ctx.putImageData(imgData, 0, 0);
    return expressionImagesData;
}

export async function preprocessImage (imageData) {
    const img = await Jimp.fromBitmap(imageData);
    img.resize({ w: IMAGE_SIZE, h: IMAGE_SIZE });
    img.greyscale();
    const imgArray = [];
    for (let i = 0; i < img.bitmap.data.length; i+= 4) {
        const value = (img.bitmap.data[i] * 2 >= 255) ? 1 : 0; // thresholding
        imgArray.push(value);
    }
    const imgArrayThinned = thinning(imgArray);
    text_input.value = "";
    for (let i = 0; i < imgArray.length; i++) {
        text_input.value += imgArray[i] + " ";
        if ((i + 1) % IMAGE_SIZE === 0) {
            text_input.value += "\n";
        }
    }
    return tf.tensor(imgArrayThinned, [1, IMAGE_SIZE, IMAGE_SIZE, 1]);
}
