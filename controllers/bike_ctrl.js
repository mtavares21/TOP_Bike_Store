const async = require('async');
const mongoose = require("mongoose");
const Schema = mongoose.Schema
const { body, validationResult } = require("express-validator");
const debug = require('debug')('bike_ctrl')
const Bike = require('../models/bike');
const BikeCategory = require('../models/bike_category')
const Gear = require('../models/gear')
const Suspension = require('../models/suspension')
const Wheel = require('../models/wheels')
const ADMIN_PASS = process.env.ADMIN_PASS

// Helper function
// Given a input list returns choosen item or null
    function isSelectedItem (group, itemId){
      const groupWithSelectedProp = group.map( item =>{
        if((item._id+'') == (itemId+'')){
          item.selected = 'selected'
        } else item.selected = null
      return item
      })
    return groupWithSelectedProp
    }

// GET bike categories
exports.get_list = function (req, res, next) {
  const cat = req.params.catName
  async.waterfall([
    function(callback){
      BikeCategory
        .find({'name':cat})
        .exec(function(err, category) {
          if(err) { 
            return next(err)
          }
          callback(null, category)
          
      })
    },
    function (category, callback){
      Bike
      .find({'bike_category':category})
      .populate('suspension_front')
      .populate('suspension_rear')
      .populate('gear')
      .populate('wheels')
      .populate('bike_category')
      .exec(function (err, list) {
        if (err) {
          return next(err);
        }
        callback(null, list)
    });
    }
  ],
  function(err, list){
    const catFormat = cat
      .split('')
      .map((l,i)=> i===0 ? l.toUpperCase():l)
      .join('')
    res.render("bike_list", {
          title: catFormat + ' ' + "Bikes",
          bike_list: list,
      }
    )
  }
)}

// GET one bike 
exports.get_item = function(req, res) {
  res.send('NOT IMPLEMENTED: get bike ');
};

            /* CREATE BIKE */ 
// GET 
exports.get_create = function (req, res){
  async.parallel({
    wheels: function (callback){
      Wheel.find(callback)
    },
    suspension_front:function (callback){
      Suspension.find({'position': 'front'}).exec(callback)
    },
    suspension_rear:function (callback){
      Suspension.find({'position':'rear'}).exec(callback)
    },
    gear:function (callback){
      Gear.find(callback)
    },
    bike_category:function (callback){
      BikeCategory.find(callback)
    }
  },
  function(err, results){
    // Show user input's after submit
    const inputs = {
      brand: '',
      model: '',
    }

    if(err){ next(err)}
    else res.render('create_bike', {
      title: 'Create Bike',
      wheels: results.wheels, 
      suspensions_front: results.suspension_front,
      suspensions_rear: results.suspension_rear,
      gears: results.gear,
      bike_category: results.bike_category,
      inputs,
    })
  }
  )
}

//POST
exports.post_create = [
  // Validade and sanitize request
  body('brand', ' Brand must not be empty')
    .trim()
    .isLength({min:1})
    .escape(),
  body('model', ' Model must not be empty')
    .trim()
    .isLength({min:1})
    .escape()
  ,
   body('bike_category', 'You must choose a bike category')
    .trim()
    .isLength({min:1})
    .escape()
  ,
   body('wheels', 'You must choose a wheel')
    .trim()
    .isLength({min:1})
    .escape()
  ,
  //Evaluate request
  function(req, res, next){ 
    const errors = validationResult(req)
    
    // Resolve request
    if(!errors.isEmpty()){
      async.parallel({
    wheels: function (callback){
      Wheel.find({}).exec(callback)
    },
    suspension_front:function (callback){
      Suspension.find({'position': 'front'}).exec(callback)
    },
    suspension_rear:function (callback){
      Suspension.find({'position':'rear'}).exec(callback)
    },
    gear:function (callback){
      Gear.find({}).exec(callback)
    },
    bike_category:function (callback){
      BikeCategory.find({}).exec(callback)
    },
    
  },
  function(err, results){
    if(err){ 
      return next(err)
    }
    // Show user input's after submit
    const inputs = {
      brand: req.body.brand || '',
      model: req.body.model || '',
    }
    res.render('create_bike', {
      title: 'Create Bike',
      wheels: isSelectedItem(results.wheels, req.body.wheels) , 
      suspensions_front: isSelectedItem(results.suspension_front, req.body.suspension_front),
      suspensions_rear: isSelectedItem( results.suspension_rear, req.body.suspension_rear) ,
      gears: isSelectedItem( results.gear,req.body.gears),
      bike_category: isSelectedItem(results.bike_category, req.body.bike_category),
      errors:errors.array(),
      inputs,
    })
  })
    }
    else {
      const bike = new Bike({
        brand: req.body.brand,
        model: req.body.model,
        wheels: req.body.wheels,
        suspension_front: req.body.suspension_front || null,
        suspension_rear: req.body.suspension_rear || null,
        gear: req.body.gears || null,
        bike_category: req.body.bike_category,
        category:'61040840cfa66a21187c8828',
      })
      bike.save( function (err) {
        if (err) { next(err)}
        else res.redirect('/catalog')
      })
    }
  }
]

            /* DELETE BIKE */
// GET
exports.get_delete = function (req, res){
  res.send('NOT IMPLEMENTED: get delete bike ');
}

// POST
exports.post_delete = async function (req, res, next){
    const cat = req.params.catName
    async.waterfall([
        function(callback){
          BikeCategory
            .find({'name':cat})
            .exec(function(err, category) {
              if(err) { 
                return next(err)
              }
              callback(null, category)
              
          })
        },
        function (category, callback){
          Bike
          .find({'bike_category':category})
          .populate('suspension_front')
          .populate('suspension_rear')
          .populate('gear')
          .populate('wheels')
          .populate('bike_category')
          .exec(function (err, list) {
            if (err) {
              return next(err);
            }
            callback(null, list)
        });
        }
      ],
      function (err, results){
        if(err){
          return next(err)
        } else if( req.body.password === ADMIN_PASS){
          Bike.findByIdAndRemove(req.params.id, function (err, result){ 
          if(err){
            return next(err)
          }
          res.redirect(`/catalog/bikes/${cat}`)
          })
          } else { 
            res.render('bike_list',{ bike_list:results, error: 'You must provide the correct password.' })
          }
      })
}

            /* UPDATE BIKE */
//GET
exports.get_update = function (req, res, next) {
  const cat = req.params.catName
  async.parallel({
    wheels: function (callback){
      Wheel.find({}).lean().exec(callback)
    },
    suspension_front:function (callback){
      Suspension.find({'position': 'front'}).lean().exec(callback)
    },
    suspension_rear:function (callback){
      Suspension.find({'position':'rear'}).lean().exec(callback)
    },
    gear:function (callback){
      Gear.find({}).lean().exec(callback)
    },
    bike_category:function (callback){
      BikeCategory.find({}).lean().exec(callback)
    },
    bike: function (callback){
        Bike.findById(req.params.id).lean().exec(callback);
    }
  },
  function (err, results){

    if(err){ 
      next(err)
      res.redirect(`/catalog/bikes/${cat}`)
    }

    const inputs = {
      brand: results.bike.brand,
      model: results.bike.model,
    }
    
    // Render 'create_bike' with pre-filled form
    res.render('create_bike', {
      title: 'Update Bike',
      wheels: isSelectedItem(results.wheels, results.bike.wheels) , 
      suspensions_front: isSelectedItem(
        results.suspension_front, results.bike.suspension_front
      ),
      suspensions_rear: isSelectedItem( 
        results.suspension_rear, results.bike.suspension_rear
      ),
      gears: isSelectedItem( results.gear,results.bike.gear),
      bike_category: isSelectedItem(results.bike_category, results.bike.bike_category),
      inputs
    })
  })
}

//POST
exports.post_update = function (req, res, next) {
  const cat = req.params.catName
  const updatedValues = req.body;
  Bike.findById(req.params.id)
  .populate('suspension_front')
  .populate('suspension_rear')
  .populate('gear')
  .populate('wheels')
  .populate('bike_category')
  .exec(
  function (err, result) {
    if(err) { 
      next(err)
      res.render( 'create_bike', {title: 'Update Bike', inputs: result, errors:err} )
    }
    if(!!result) {
      debug(req.body)
      if (req.body.suspension_rear === '')
        updatedValues.suspension_rear = null;
      Bike.findByIdAndUpdate(req.params.id, updatedValues, {},
      function(err, result){
        if (err) { return next(err) }
        else res.redirect(`/catalog/bikes/${cat}`)
      })
    } else res.render( 'create_bike', {title: 'Update Bike', inputs: result, errors:[ {msg:'Failed to update'}] })
  })
}