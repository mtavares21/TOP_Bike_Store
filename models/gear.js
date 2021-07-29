const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gear_schema = new Schema({
  brand: { type: String, max_length: 100},
  model: { type: String, max_length: 100},
  speeds: { type:Number, max_length:2},
  category: {type: Schema.Types.ObjectId, ref: 'category'},
  comp_cat: {type: Schema.Types.ObjectId, ref: 'comp_cat'},
  price: { type: Number, max_length: 5},
})

// Virtual for bike_cat URL
gear_schema.virtual("url").get(function () {
  return "/catalog/components/gear" + this._id;
});

//Export model
module.exports = mongoose.model("gear", gear_schema);