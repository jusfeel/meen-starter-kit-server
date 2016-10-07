  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
	var modelName = 'entry';
	var collName = 'entries';
	var nameSpace = 'api/v1';
  var db = mongojs('npcp', [collName]);
 
  router.get('/', function(req, res) {
    res.render('index');
  });
 
  router.get('/' + nameSpace + '/' + collName, function(req, res) {
    db[collName].find(function(err, data) {
			var _obj = {};
			_obj[modelName] = data;
      res.json(_obj);
    });
  });
 
  router.post('/' + nameSpace + '/' + collName, function(req, res) {
		var _obj = req.body[modelName];
    db[collName].insert(_obj, function(err, data) {
			var _obj = {};
			_obj[modelName] = data;
      res.json(_obj);
    });
 
  });
 
  router.patch('/' + nameSpace + '/' + collName, function(req, res) {

		var _id = req.body[modelName]._id;
    var _obj = req.body[modelName]; 
		delete _obj._id;

    db[collName].update({
      _id: mongojs.ObjectId(_id)
    }, _obj, {}, function(err, data) {
			var _obj = {};
			_obj[modelName] = data;
      res.json(_obj);
    });
 
  });
 
  router.delete('/' + nameSpace + '/' + collName + '/:_id', function(req, res) {
    db[collName].remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
			var _obj = {};
			_obj[modelName] = data;
      res.json(_obj);
    });
 
  });
 
  module.exports = router;
