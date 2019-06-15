module.exports = (app) => {
	// Dart Module
    const dart = require('../controller/dart.controller.js');
	app.post('/dart_create', dart.create);   
	app.get('/dart_select/:userName&:fromDate&:toDate', dart.select);  
	app.get('/dart_selectSingle/:userName&:taskDate', dart.selectSingle); 
	app.post('/dart_update', dart.update);   
}