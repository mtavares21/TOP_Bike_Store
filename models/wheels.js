const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wheels_schema = new Schema({
  brand: { type: String, max_length: 100},
  model: { type: String, max_length: 100},
  size: { type: String, enum: ['rear', 'front']},
  width: { type: Number, max_length: 100},
  category: {type: Schema.Types.ObjectId, ref: 'category'},
  comp_cat: {type: Schema.Types.ObjectId, ref: 'comp_cat'},
  price: { type: Number, max_length: 5},
})

// Virtual for bike_cat URL
wheels_schema.virtual("url").get(function () {
  return "/catalog/components/wheels" + this._id;
});

//Export model
module.exports = mongoose.model("wheels", wheels_schema);