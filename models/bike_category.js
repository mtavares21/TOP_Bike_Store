const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bike_cat_schema = new Schema({
  name: { type: String, max_length: 50 }
})

// Virtual for bike_cat URL
bike_cat_schema.virtual('url').get(function () {
  return '/catalog/' + this.name
})

// Export model
module.exports = mongoose.model('bike_category', bike_cat_schema)
