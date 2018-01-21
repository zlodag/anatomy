var express = require('express');
var mongoose = require('mongoose');

function routerFactory(model) {
  var router = express.Router();


    /* GET ALL ITEMS */
  router.get('/', function(req, res, next) {
    model.find(req.query, function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });

  /* GET SINGLE ITEM BY ID */
  router.get('/:id', function(req, res, next) {
    model.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* SAVE ITEM */
  router.post('/', function(req, res, next) {
     model.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* UPDATE ITEM */
  router.put('/:id', function(req, res, next) {
    model.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* DELETE ITEM */
  router.delete('/:id', function(req, res, next) {
    model.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  return router;
}

module.exports = routerFactory;
