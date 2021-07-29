const mongoose = require('mongoose')
const Schema = mongoose.Schema

const suspension_schema = new Schema({
  brand: { type: String, max_length: 100},
  model: { type: String, max_length: 100},
  position: { type: String, enum: ['rear', 'front']},
  travel: { type: Number, max_length: 100},
  category: {type: Schema.Types.ObjectId, ref: 'category'},
  comp_cat: {type: Schema.Types.ObjectId, ref: 'comp_cat'},
  price: { type: Number, max_length: 5},
})

// Virtual for bike_cat URL
suspension_schema.virtual("url").get(function () {
  return "/catalog/components/suspension" + this._id;
});

//Export model
module.exports = mongoose.model("suspension", suspension_schema);