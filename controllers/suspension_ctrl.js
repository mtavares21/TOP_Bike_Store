const async = require('async');
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const Suspension = require('../models/suspension')
const Bike = require('../models/bike')
const debug = require('debug')('suspension_ctrl')

// READ
exports.get_list = function(req, res){
  Suspension.find({}).exec(function (err,results) {
    if(err) {return next(err)}
    res.render('suspension_list',{title: 'Suspensions', sus_list: results})
  })
  
}

exports.get_item = function(req, res) {
  res.send('get_item')
}

// CREATE
exports.get_create = function (req, res) {
  res.render('create_suspension', { title:'Create Suspension' })
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
  body('travel', ' Travel must not be empty')
    .trim()
    .isLength({min:1})
    .escape(),
  body('travel', ' Travel must be integer')
    .isInt()
  ,
  //Evaluate request
  function(req, res, next){ 
    const errors = validationResult(req)
    const inputs = {
      brand: req.body.brand,
      model: req.body.model,
      travel: req.body.travel,
      position: req.body.position,
    }
  // Resolve request
    if(!errors.isEmpty()){
      res.render('create_suspension', {title: 'Create Suspension', inputs, errors: errors.array()} )
    }
    else {
      const suspension = new Suspension({
        brand: req.body.brand,
        model: req.body.model,
        travel: req.body.travel,
        position: req.body.position,
        comp_cat: '61040840cfa66a21187c8830',
        category:'6104083fcfa66a21187c8825'
      })
      debug('New suspension: '+ suspension)
      suspension.save( function (err) {
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
  async.parallel({
    suspension: function (callback) {
      Suspension.findById(req.params.id).exec(callback)
    },
    bikesWithFrontSuspension: function (callback) {
      Bike.find({'suspension_front': req.params.id}).exec(callback)
    },
    bikesWithRearSuspension: function (callback) {
      Bike.find({'suspension_rear': req.params.id}).exec(callback)
    },
    suspensions: function (callback) {
      Suspension.find({}).exec(callback)
    }
  },
   function (err, results) {
    const bikesWithSuspension = results.bikesWithFrontSuspension.concat(results.bikesWithRearSuspension)
    debug( bikesWithSuspension)
    if(err){ 
      return next(error)
    } else if(!!results.suspension.length){
        return new Error('Suspension not found!')
    } else if(!!bikesWithSuspension.length) {
        res.render('suspension_list',{title: 'Suspensions', sus_list: results.suspensions, bikesWithSuspension})
    } else Suspension.findByIdAndRemove(result._id, (err)=> {
      if(err){ 
        next(err)
        res.send('Failed to delete wheel!')
      }
      res.redirect('/catalog/components/suspensions')
    })
  }
  )
}


// UPDATE
exports.get_update = function (req, res) {
  res.send('get_update')
}

exports.post_update= function (req, res) {
  res.send('post_update')
}