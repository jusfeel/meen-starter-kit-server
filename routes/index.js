  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
	var collName = 'entries';
  var db = mongojs('npcp', [collName]);
 
  router.get('/', function(req, res) {
    res.render('index');
  });
 
  router.get('/api/' + collName, function(req, res) {
    db[collName].find(function(err, data) {
      res.json(data);
    });
  });
 
  router.post('/api/' + collName, function(req, res) {
    db[collName].insert(req.body, function(err, data) {
      res.json(data);
    });
 
  });
 
  router.put('/api/' + collName, function(req, res) {
		var _id = req.body._id;
    var _obj = req.body; 
		delete _obj._id;

    db[collName].update({
      _id: mongojs.ObjectId(_id)
    }, _obj, {}, function(err, data) {
      res.json(data);
    });
 
  });
 
  router.delete('/api/' + collName + '/:_id', function(req, res) {
    db[collName].remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      res.json(data);
    });
 
  });
 
  module.exports = router;
