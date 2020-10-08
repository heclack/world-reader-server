const vision = require( '@google-cloud/vision' );
module.exports=(captureFile)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const results = [];
            const client = new vision.ImageAnnotatorClient();
            const [result] = await client.textDetection(captureFile);
            const detext = result.textAnnotations;
            await detext.forEach((text)=>{
                results.push(text.description)
            });
            return resolve({
                src: captureFile,
                result: results
            });
        }catch(err){
            return reject(err)
        }
    });
};