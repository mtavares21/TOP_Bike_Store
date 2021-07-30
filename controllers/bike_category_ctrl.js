const async = require('async');
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const Bike = require('../models/bike');
const BikeCategory = require('../models/bike_category')

// READ
//GET
exports.get_list = function (req, res) {
   BikeCategory.find()
    .sort("name")
    .exec(function (err, list) {
      if (err) {
        return next(err);
      }
      res.render("bike_index", {
        title: "Bike Category",
        category_list: list,
      });
    });
}

