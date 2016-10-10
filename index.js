  var express = require('express');
  var path = require('path');
	var cors = require('cors');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');

	var nameSpace = '/api/v1/';
 
  var index = require('./routes/index');
  var countries = require('./routes/countries');
  var systems = require('./routes/systems');
 
  var app = express();
 
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
 
  app.use(express.static(path.join(__dirname, '../client')));
 
  app.use(cors());	

  app.use(nameSpace, index);
  app.use(nameSpace, countries);
  app.use(nameSpace, systems);
 
  app.set('port', process.env.PORT || 3000);
 
  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });
 
  module.exports = app;
