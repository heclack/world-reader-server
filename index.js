const  proccessImageText  = require('./controllers/');

const fs = require('fs');

const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

app.use(express.static('./public'));
app.use(fileUpload());

app.post('/upload', (req, res) => {
	if (!req.files.capture_image) {
		return res.sendStatus(400);
	} else {
		proccessImageText(req.files.capture_image).then((result)=>{
			console.log(result);
			return res.sendStatus(200);
		}).catch(err=>{
			return res.sendStatus(600)});
	}
});

app.listen(3000, () => {
	console.log('server listening@ localhost:3000');
});


///////////////////////////////////just to add some cleanup to dev env
