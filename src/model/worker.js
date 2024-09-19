import { loadModel, predictExpressions } from "./model";

self.addEventListener("message", async (e) => {
    if (e.data.message == 'LOAD') {
        await loadModel();
        self.postMessage("Model loaded successfully.");
    }
    else if (e.data.message == 'PREDICT') {
        const result = await predictExpressions(e.data.imgData);
        self.postMessage(result);
    }
});
