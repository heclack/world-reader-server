const express = require( 'express' );
const fileUpload = require( 'express-fileupload' );
const classyImage = require('./controllers/classyImage');

const net = require('net');
const crypto = require('crypto');
const fs = require( 'fs' );

const app = express();

app.use( express.static( './public' ) );
app.use( fileUpload() );


app.get( '/capture/:cid', ( req, res ) =>{
  let captureFile = fs.readFileSync( `./tmp/capture${cid}.jpg` );
  res.sendFile( captureFile );
});

app.get( '/deps/:name', ( req, res ) =>{
  let depend = fs.readFileSync( `./models/${req.params.name}.js` );
  res.sendFile( depend );
});



app.post( '/upload', ( req, res ) =>{
  if (!req.files || Object.keys( req.files ).length === 0){
    return res.status( 400 ).send( 'No files were uploaded.' );
  };
  let upload = req.files.capture_image;
  let captureResults = {
    cid: crypto.createHash('md5').update(`${upload}`).digest('hex')
  };
  upload.mv( `./tmp/capture${captureResults.cid}.jpg`, (err)=>{
      if(err) res.status(500).send('file moved')
   });
   classyImage(`./tmp/capture${captureResults.cid}.jpg`).then((results)=>{
     captureResults.res = results;
     console.log(results);
     
   }).catch(err=>{console.log(err)});
});


  app.listen( 3000, () =>{
    console.log( 'server listening@ localhost:3000' )
  })

