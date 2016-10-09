  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
	var collection = 'countries';
  var db = mongojs('npcp', [collection]);
 
  router.get('/', function(req, res) {
    res.render('index');
  });
 
  router.get('/' + collection + '/:_id', function(req, res) {
    db[collection].find({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      res.json(data[0]);
    });
 
  });

  router.get('/' + collection, function(req, res) {
    db[collection].find(function(err, data) {
      res.json(data);
    });
  });
 
  router.post('/' + collection, function(req, res) {
    db[collection].insert(req.body, function(err, data) {
      res.json(data);
    });
  });
 
  router.patch('/' + collection + '/:_id', function(req, res) {
		if(req.params._id != req.body._id) {
		  res.status(400);
      res.json({
        "error": "Invalid Data"
      });
		}

    var _obj = req.body; 
		delete _obj._id;

    db[collection].update({
      _id: mongojs.ObjectId(req.params._id)
    }, req.body, {}, function(err, data) {
			_obj._id = req.params._id;
      res.json(_obj);
    });
 
  });
 
  router.delete('/' + collection + '/:_id', function(req, res) {
    db[collection].remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
		  res.status(200);
      res.json(null);
    });
 
  });
 
  module.exports = router;
