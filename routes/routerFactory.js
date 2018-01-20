var express = require('express');
var mongoose = require('mongoose');

function routerFactory(model) {
  var router = express.Router();


  router.use(function(req, res, next){
    console.log('Factory path was ' + req.path);
    next();
  });

    /* GET ALL ITEMS */
  router.get('/', function(req, res, next) {
    console.log('GET ALL ITEMS: Body = ' + JSON.stringify(req.query));
    // var qb = model.find();
    // if (req.params.g)
    model.find(req.query, function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });

  /* GET SINGLE ITEM BY ID */
  router.get('/:id', function(req, res, next) {
    console.log('ID was ' + req.params.id);
    model.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* SAVE ITEM */
  router.post('/', function(req, res, next) {
     console.log('SAVE ITEM: Body = ' + JSON.stringify(req.body));
     model.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* UPDATE ITEM */
  router.put('/:id', function(req, res, next) {
    console.log('ID was ' + req.params.id);
    model.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* DELETE ITEM */
  router.delete('/:id', function(req, res, next) {
    console.log('ID was ' + req.params.id);
    model.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  return router;
}

module.exports = routerFactory;
