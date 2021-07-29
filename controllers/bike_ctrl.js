const async = require('async');
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const Bike = require('../models/bike');

// GET bike categories
exports.get_category_list = function(req, res) {
    res.send('NOT IMPLEMENTED: get bike categories');
};

// GET bike list
exports.get_bike_list = function(req, res) {
    res.send('NOT IMPLEMENTED: get bike list ');
};

// GET one bike 
exports.get_bike = function(req, res) {
    res.send('NOT IMPLEMENTED: get bike ');
};

            /* CREATE BIKE */ 
// GET 
exports.get_create_bike = function (req, res){
  res.send('NOT IMPLEMENTED: get create bike ');
} 

//POST
exports.post_create_bike = function (req, res){
  res.send('NOT IMPLEMENTED: post create bike ');
}

            /* DELETE BIKE */
// GET
exports.get_delete_bike = function (req, res){
  res.send('NOT IMPLEMENTED: get delete bike ');
}

// POST
exports.post_delete_bike = function (req, res){
  res.send('NOT IMPLEMENTED: post delete bike ');
}

            /* UPDATE BIKE */
//GET
exports.get_update_bike = function (req, res){
  res.send('NOT IMPLEMENTED: get update bike ');
}
//POST
exports.post_update_bike = function (req, res){
  res.send('NOT IMPLEMENTED: post update bike ');
}