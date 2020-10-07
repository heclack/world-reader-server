const express = require( 'express' );
const fileUpload = require( 'express-fileupload' );
const imageReader = require('./models/');

const crypto = require('crypto');
const fs = require( 'fs' );

const app = express();

app.use( express.static( './public' ) );
app.use( fileUpload() );


app.get( '/capture/:cid', ( req, res ) =>
{
  let captureFile = fs.readFileSync( `./tmp/capture${cid}.jpg` );
  res.sendFile( captureFile );
});


app.post( '/upload', ( req, res ) =>
{
  if (!req.files || Object.keys( req.files ).length === 0)
  {
    return res.status( 400 ).send( 'No files were uploaded.' );
  };
  let capture = req.files.capture_image;
  let cid = crypto.createHash('md5').update(`${capture}`).digest('hex');
  capture.mv( `./tmp/capture${cid}.jpg`, (err)=>{
    if(err){
      res.send(500)
    } else {
      imageReader(`./tmp/capture${cid}.jpg`);
    };
  });
});


  app.listen( 3000, () =>{
    console.log( 'server listening@ localhost:3000' )
  })

