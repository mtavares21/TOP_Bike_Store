const async = require('async');
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const Wheel = require('../models/wheels');

// READ
exports.get_list = function(req, res){
  Wheel
  .find({})
  .exec( function (err, wheels_list) {
    if (err) { return next(err)}
    callback(null, wheels_list)
  })
  function callback(err, results) {
    if(err){ next(err)}
    res.render('wheel_list',{ title: 'Wheels', wheel_list: results})
  }
}

exports.get_item = function(req, res) {
  res.send('get_item')
}

// CREATE
exports.get_create = function (req, res) {
  res.render('create_wheel', {title: 'Create Wheel'})
}

exports.post_create = [
  // Validade and sanitize request
  body('brand', ' Brand must not be empty')
    .trim()
    .isLength({min:1})
    .escape(),
  body('model', ' Model must not be empty')
    .trim()
    .isLength({min:1})
    .escape(),
  body('size', ' Size must not be empty')
    .trim()
    .isLength({min:1})
    .escape(),
  body('size', ' Size must be integer')
    .isInt(),
  body('width', ' Width must not be empty')
    .trim()
    .isLength({min:1})
    .escape(),
  body('width', ' Width must be integer')
    .isInt()
  ,
  //Evaluate request
  function(req, res, next){ 
    const errors = validationResult(req)
    const inputs = {
      brand: req.body.brand,
      model: req.body.model,
      size: req.body.size,
      width: req.body.width,
    }
  // Resolve request
    if(!errors.isEmpty()){
      res.render('create_wheel', {title: 'Create Wheel', inputs, errors: errors.array()} )
    }
    else {
      const wheel = new Wheel({
        brand: req.body.brand,
        model: req.body.model,
        size: req.body.size,
        width: req.body.width,
        comp_cat: '61040840cfa66a21187c882e',
        category:'6104083fcfa66a21187c8825'
      })
      wheel.save( function (err) {
        if (err) { next(err)}
        else { res.redirect('/catalog')}
      })
    }
  }
]

// DELETE
exports.get_delete = function (req, res) {
  res.send('get_delete')
}

exports.post_delete= function (req, res) {
  res.send('post_delete')
}

// UPDATE
exports.get_update = function (req, res) {
  res.send('get_update')
}

exports.post_update= function (req, res) {
  res.send('post_update')
}