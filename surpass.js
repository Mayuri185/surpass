/*
 Author: Mayuri Patil
 Date:29th July
 Version:0.0.1
 * */
var express = require('express');
var fileUpload = require('express-fileupload');
var node_xj = require("xls-to-json");
var app = express();
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// default options
app.use(fileUpload());
app.get('/', function(req, res) {
	res.render('index.html');
});
app.post('/download',function(req,res){
  res.download('surpass.json');
});

app.post('/upload', function(req, res) {
	console.log('hello');
	var sampleFile;

	if (!req.files) {
		res.send('No files were uploaded.');
		return;
	}

	sampleFile = req.files.sampleFile;
	console.log(req.files);

	sampleFile.mv('data.xls', function(err) {
		if (err) {
			res.status(500).send(err);
		} else {
			console.log('File uploaded!');
			node_xj({
				input : "data.xls", // input xls
				output : "surpass.json" // output json
			}, function(err, result) {
				if (err) {
					console.error(err);
				} else {
					console.log(result);
				}
			});
			res.render('download.html');
		}
	});
});

var server = app.listen(8002, function() {
	console.log('Server listening on port ' + server.address().port);
});
