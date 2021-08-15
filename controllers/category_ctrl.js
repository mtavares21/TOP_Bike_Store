const async = require('async');
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const Category = require('../models/category')

// READ
exports.get_list = function(req, res){
     Category.find()
    .sort("name")
    .exec(function (err, list) {
      if (err) {
        return next(err);
      }
      res.render("index", {
        title: "Index",
        category_list: list,
      });
    });
}


exports.get_item = function(req, res) {
  res.send('get_item')
}

// CREATE
exports.get_create = function (req, res) {
  res.send('get_create')
}

exports.post_create = function (req, res) {
  res.send('post_create')
}

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