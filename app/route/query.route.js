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
    const dart = require('../controller/query.controller.js');
	app.post('/query_insert', dart.create);   
	app.get('/query_select', dart.select);   
}