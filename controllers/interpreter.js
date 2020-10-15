const textToSpeech = require('@google-cloud/text-to-speech');
const vision = require('@google-cloud/vision');
const fs = require('fs/promises');

    const readImageText=async(fileid)=>{
            try{
                const results = [];
                const client = new vision.ImageAnnotatorClient();
                const [result] = await client.textDetection(`./tmp/${fileid}.png`);
                const text = await result.textAnnotations;
                return text[0].description;
            }catch(err){
                console.log(err)
            }
    };
    
    const getSpeechAudio=async(text, id)=>{
        try{
            const client = new textToSpeech.TextToSpeechClient();
            const request={
                input: {ssml: `<speak>${text}</speak>`},
                voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
                audioConfig: {audioEncoding: 'MP3'},
            };
            const [response] = await client.synthesizeSpeech(request);
            let audio = await response.audioContent;
            return audio;
        }catch(err){
          console.log(err);
    }
};

    module.exports=async(upload)=>{
        try{
            let fileid = upload.md5;
            await upload.mv(`./tmp/${fileid}.png`);
            let textDescription = await readImageText(fileid);
            let audio = await getSpeechAudio(textDescription, fileid);
            await fs.writeFile(`./tmp/${fileid}.mp3`, audio, "binary");
            
              
        }catch(err){
            return err;
        }
    };

