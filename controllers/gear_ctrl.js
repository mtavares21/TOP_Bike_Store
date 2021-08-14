const async = require('async');
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const Gear = require('../models/gear')
const Bike = require('../models/bike')
const debug = require('debug')('gear_ctrl')
// READ
exports.get_list = function(req, res){
  Gear.find({}).exec(function (err,results) {
    if(err) {return next(err)}
    res.render('gear_list',{title: 'Gears', gear_list: results})
  })
  
}

exports.get_item = function(req, res) {
  res.send('get_item')
}

// CREATE
exports.get_create = function (req, res) {
  res.render('create_gear', {title: 'Create Gear'})
}

exports.post_create =[
  // Validade and sanitize request
  body('brand', ' Brand must not be empty')
    .trim()
    .isLength({min:1})
    .escape(),
  body('model', ' Model must not be empty')
    .trim()
    .isLength({min:1})
    .escape(),
  body('speeds', ' Speeds must not be empty')
    .trim()
    .isLength({min:1})
    .escape(),
  body('speeds', ' Speeds must be integer')
    .isInt()
  ,
  //Evaluate request
  function(req, res, next){ 
    const errors = validationResult(req)
    const inputs = {
      brand: req.body.brand,
      model: req.body.model,
      speeds: req.body.speeds
    }
  // Resolve request
    if(!errors.isEmpty()){
      res.render('create_gear', {title: 'Create Gear', inputs, errors: errors.array()|| []} )
    }
    else {
      const gear = new Gear({
        brand: req.body.brand,
        model: req.body.model,
        speeds: req.body.speeds,
        comp_cat: '61040840cfa66a21187c8832',
        category:'6104083fcfa66a21187c8825'
      })
     gear.save( function (err) {
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

exports.post_delete = function (req, res) {
  async.parallel({
  gear: function(callback){
    Gear.findById(req.params.id).exec(callback)
  },
  gears: function(callback){
    Gear.find({}).exec(callback)
  },
  bikes: function(callback) {
    Bike.find({'gear':req.params.id}).exec(callback)
  }
  },
  function (err, results) {
    debug('delete gear:' + results)
    if(err){ 
      return next(error)
    } else if( !!results.gear && !!results.gear.length){ // Gear not found
        return new Error('Suspension not found!')
    } else if( !!results.bikes.length ){ // Bikes using this gear
        res.render('gear_list', {
          title: 'Gears',
          gear_list: results.gears,
          bikes: results.bikes
        })
    } else { // Suspension not in use
      Gear.findByIdAndRemove(req.params.id, (err)=> {
        if(err){ 
          next(err)
          res.send('Failed to delete gear!')
        }
        res.redirect('/catalog/components/gears')
      })
    }
  })
}

// UPDATE
exports.get_update = function (req, res) {
  res.send('get_update')
}

exports.post_update= function (req, res) {
  res.send('post_update')
}