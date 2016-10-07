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
 
  router.get('/' + nameSpace + '/' + collName + '/:_id', function(req, res) {
    db[collName].find({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
			var _obj = {};
			_obj[modelName] = data;
      res.json(_obj);
    });
 
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
 
  router.patch('/' + nameSpace + '/' + collName + '/:_id', function(req, res) {

		if(req.params._id != req.body[modelName]._id) {
		  res.status(400);
      res.json({
        "error": "Invalid Data"
      });
		}

    var _obj = req.body[modelName]; 
		delete _obj._id;

    db[collName].update({
      _id: mongojs.ObjectId(req.params._id)
    }, _obj, {}, function(err, data) {
			var _obj2 = {};
			_obj._id = req.params._id;
			_obj2[modelName] = _obj;
      res.json(_obj2);
    });
 
  });
 
  router.delete('/' + nameSpace + '/' + collName + '/:_id', function(req, res) {
    db[collName].remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      res.json({});
    });
 
  });
 
  module.exports = router;
