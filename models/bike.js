const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bike_schema = new Schema({
  brand: { type: String, max_length: 100},
  model: { type: String, max_length: 100},
  suspension: {type: Schema.Types.ObjectId, ref: 'suspension'},
  gear: {type: Schema.Types.ObjectId, ref: 'gear'},
  bike_category: {type: Schema.Types.ObjectId, ref: 'bike_category'},
  category: {type: Schema.Types.ObjectId, ref: 'category'},
  price: { type: Number, max_length: 5},
})

// Virtual for bike_cat URL
bike_schema.virtual("url").get(function () {
  return "/catalog/components/bike" + this._id;
});

//Export model
module.exports = mongoose.model("bike", bike_schema);