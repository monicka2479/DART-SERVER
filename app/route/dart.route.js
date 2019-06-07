const multer = require('multer');

 var storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, 'assets/images')
	},
	filename: (req, file, cb) => {
	  cb(null, file.originalname)
	}
});
 
var upload = multer({storage: storage});

module.exports = (app) => {
	// Dart Module
    const dart = require('../controller/dart.controller.js');
	app.post('/dart_create', dart.create);   
	app.get('/dart_select', dart.select);   
}