const textToSpeech = require('@google-cloud/text-to-speech');
const vision = require('@google-cloud/vision');
const fs = require('fs');

    const moveUploadedFile=(uploadedFile)=>{
        return new Promise((resolve, reject)=>{
            const filename = `./tmp/${uploadedFile.md5}.${uploadedFile.mimetype.split('/')[1]}`;
            uploadedFile.mv(`${filename}`).then((done)=>{
                return resolve(filename)
            }).catch(err=>{
                return reject(err)
            });
        })
    };

    const getImageText=(imageFile)=>{
        return new Promise(async(resolve, reject)=>{
            try{
                const results = [];
                const client = new vision.ImageAnnotatorClient();
                const [result] = await client.textDetection(imageFile);
                const imageText = await result.textAnnotations;
                console.log(imageText[0].description);
                return resolve(imageText[0].description);
            }catch(err){
                return reject(err)
            }
        });
    };
    
    const getText2Speech=(imageText)=>{
        return new Promise(async(resolve, reject)=>{
        try{
            const client = new textToSpeech.TextToSpeechClient();

                    const request={
                        input: {ssml: `<speak>${imageText}</speak>`},
                        voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
                        audioConfig: {audioEncoding: 'MP3'},
                    };
                    const [response] = await client.synthesizeSpeech(request);
                    let audio = await response.audioContent;
                    let ab = Buffer.from(audio);
                    return resolve(ab);                    
        
        }catch(err){
          return reject(err);
        }
    });
};

    module.exports=async(upload)=>{
        try{
            let imageFile = await moveUploadedFile(upload);
            let detectedText = await getImageText(imageFile);
            let speechAudio = await getText2Speech(detectedText);
            return({
                file: imageFile,
                text: detectedText,
                audio: speechAudio
            }) 
        }catch(err){
            return err;
        }
    };

