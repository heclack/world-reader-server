const express = require('express');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const vision = require('@google-cloud/vision');

const app = express();

app.use(fileUpload());


app.use(express.static('./public'));

app.get('/capture', (req, res)=>{
    let file = fs.readFileSync(`./tmp/capture`);
    res.send(file);
});

app.post('/upload', (req, res)=>{
      if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let capture = req.files.capture_image;
  capture.mv('./tmp/capture.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

        res.send('File uploaded!');
    });
});

app.listen(3000, ()=>{
    console.log('server listening@ localhost:3000')
})

