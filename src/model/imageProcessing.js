import * as tf from '@tensorflow/tfjs';
import { Jimp } from 'jimp';
import { thinning } from './thinning';

const IMAGE_SIZE = 45;

const dir = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [-1, 1], [-1, -1], [1, -1]];

function dfs (arr, marked, i, j, comp) {
    comp.push([i, j]);
    marked[i][j] = true;
    for (let d of dir) {
        let ni = i + d[0];
        let nj = j + d[1];
        if (ni >= 0 && nj >= 0 && ni < arr.length && nj < arr[0].length && !marked[ni][nj] && arr[ni][nj] === 0) {
            dfs(arr, marked, ni, nj, comp);
        }
    }
}

async function getURL (imageData) {
    const img = await Jimp.fromBitmap(imageData);
    return await img.getBase64("image/jpeg", { quality: 100 });
}

export async function extractExpressions (imageData) {
    const img = await Jimp.fromBitmap(imageData);
    if (img.bitmap.height >= IMAGE_SIZE) {
        img.resize({
            w: img.bitmap.width * IMAGE_SIZE / img.bitmap.height,
            h: IMAGE_SIZE
        });
    }
    img.greyscale();
    const sharpenKernel = [
      [ 0, -1,  0],
      [-1,  5, -1],
      [ 0, -1,  0]
    ];
    img.convolute(sharpenKernel);
    for (let i = 0; i < img.bitmap.data.length; i += 4) {
        img.bitmap.data[i] = (img.bitmap.data[i] * 2 >= 255) ? 255 : 0;
        img.bitmap.data[i + 1] = img.bitmap.data[i + 2] = img.bitmap.data[i];
    }
    // get image URL
    const imgURL = await img.getBase64("image/png");
    console.log("Image URL: ", imgURL);
    const [width, height] = [img.bitmap.width, img.bitmap.height];

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
    for (let j = 0; j < width; j++) {
        for (let i = 0; i < height; i++) {
            if (imgArray[i][j] === 0 && !marked[i][j]) {
                const comp = [];
                dfs(imgArray, marked, i, j, comp);
                components.push(comp);
            }
        }
    }
    const compBoxes = [];
    for (let comp of components) {
        let [minX, minY] = [width, height];
        let [maxX, maxY] = [0, 0];
        for (let [i, j] of comp) {
            minX = Math.min(minX, j);
            minY = Math.min(minY, i);
            maxX = Math.max(maxX, j);
            maxY = Math.max(maxY, i);
        }
        const [w, h] = [maxX - minX + 1, maxY - minY + 1];
        compBoxes.push([minX, minY, w, h]);
    }
    // Find all the cases where expression parts are splited and merge them
    for (let i = 1; i < compBoxes.length; i++) {
        const [x1, y1, w1, h1] = compBoxes[i];
        const [x2, y2, w2, h2] = compBoxes[i - 1];
        if (x1 < x2 + w2 / 2 || (x2 + w2) >= (x1 + w1 / 2)) {
            compBoxes[i] = [Math.min(x1, x2),
                            Math.min(y1, y2),
                            Math.max(x1 + w1, x2 + w2) - Math.min(x1, x2),
                            Math.max(y1 + h1, y2 + h2) - Math.min(y1, y2)];
            compBoxes[i - 1] = [0, 0, 0, 0];
            components[i] = components[i].concat(components[i - 1]);
            components[i - 1] = [];
        }
    }
    let k = 0;
    const expressionImagesData = [];
    for (let [x, y, w, h] of compBoxes) {
        if (w === 0 || h === 0) {
            k++;
            continue;
        }
        const maxSize = Math.max(w, h);
        const imgData = new ImageData(
            new Uint8ClampedArray(4 * maxSize * maxSize).fill(255),
            maxSize
        );
        for (let [i, j] of components[k]) {
            const row = i - y + Math.floor((maxSize - h) / 2);
            const col = j - x + Math.floor((maxSize - w) / 2);
            const idx = (row * maxSize + col) * 4;
            imgData.data[idx] = imgData.data[idx + 1] = imgData.data[idx + 2] = 0;
        }
        expressionImagesData.push(imgData);
        k++;
    }
    console.log("Number of components: ", components.length);
    return expressionImagesData;
}

export async function preprocessImage (imageData) {
    const img = await Jimp.fromBitmap(imageData);
    img.resize({ w: IMAGE_SIZE, h: IMAGE_SIZE });
    img.greyscale();
    const imgArray = [];
    for (let i = 0; i < img.bitmap.data.length; i+= 4) {
        const value = (img.bitmap.data[i] * 2 >= 255) ? 1 : 0;
        imgArray.push(value);
    }
    const imgArrayThinned = thinning(imgArray);
    return tf.tensor(imgArrayThinned, [1, IMAGE_SIZE, IMAGE_SIZE, 1]);
}
