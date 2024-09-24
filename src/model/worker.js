import { loadModel, predictExpressions } from "./model";

self.addEventListener("message", async (e) => {
    if (e.data.message == 'LOAD') {
        let T = performance.now();
        await loadModel();
        self.postMessage(`Model loaded in ${Math.round(performance.now() - T)} ms`);
    }
    else if (e.data.message == 'PREDICT') {
        const result = await predictExpressions(e.data.imgData);
        self.postMessage(result);
    }
});
