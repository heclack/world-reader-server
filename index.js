const  interpImage  = require('./controllers/interpreter');

const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

app.use(express.static('./public'));
app.use(fileUpload());

app.post('/upload', (req, res) => {
	if (!req.files.capture_image) {
		return res.sendStatus(400);
	} else {
		interpImage(req.files.capture_image).then((result)=>{
			
			return res.send(result);
		}).catch(err=>{
			return res.sendStatus(600)});
	}
});

app.listen(3000, () => {
	console.log('server listening@ localhost:3000');
});
