module.exports = (app) => {
  const version = require('../controller/version.controller.js');
	app.post('/version_insert', version.insert); 
}