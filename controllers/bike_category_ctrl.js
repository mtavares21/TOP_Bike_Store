const async = require('async');
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const Bike = require('../models/bike');
const BikeCategory = require('../models/bike_category')

exports.get_category_list = function (req, res) {
   BikeCategory.find()
    .sort("name")
    .exec(function (err, list) {
      if (err) {
        return next(err);
      }
      res.render("genre_list", {
        title: "Bike Category",
        category_list: list,
      });
    });
}

