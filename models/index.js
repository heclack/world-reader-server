const vision = require( '@google-cloud/vision' );
module.exports=async(imageFile)=>{
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.labelDetection(imageFile);
    const labels = result.labelAnnotations;
    labels.forEach((label)=>{
        console.log(label);
    });
}