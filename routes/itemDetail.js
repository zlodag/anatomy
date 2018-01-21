var express = require('express');
var mongoose = require('mongoose');

function addItemDetailMethods(router) {

  router.post('/:id/introduction', function(req, res, next) {
    // console.log('ID was ' + req.params.id);
    model.findByIdAndUpdate(req.params.id, {introduction: req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  return router;
}

module.exports = addItemDetailMethods;