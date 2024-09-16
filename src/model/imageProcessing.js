import * as tf from '@tensorflow/tfjs';
import { Jimp } from 'jimp';
import { thinning } from './thinning';

const IMAGE_SIZE = 45;

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
    return tf.tensor(imgArrayThinned, [1, IMAGE_SIZE, IMAGE_SIZE, 1]);
}
