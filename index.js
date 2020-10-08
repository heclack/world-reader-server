const express = require( 'express' );
const fileUpload = require( 'express-fileupload' );
const {spawn} = require('child_process');

const classyImage = require('./controllers/classyImage');

const crypto = require('crypto');
const fs = require( 'fs' );

const app = express();

app.use( express.static( './public' ) );
app.use( fileUpload() );

app.post( '/upload', ( req, res ) =>{
  if(!req.files.capture_image){
    return res.status(400)
  } else {
    (async(file = req.files.capture_image)=>{
        let filename = `./tmp/capt_${file.md5}.${file.mimetype.split('/')[1]}`;
        console.log(filename);
        file.mv(filename, (err)=>{
          if (err){
            return console.log(err)
          };
        })
      classyImage(filename).then((results)=>{
        console.log(results)
      }).catch(err=>{console.log(err)});
    })();
  }
});


  app.listen( 3000, () =>{
    console.log( 'server listening@ localhost:3000' )
  })

