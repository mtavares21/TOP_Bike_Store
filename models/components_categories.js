const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comp_cat_schema = new Schema({
  name: { type: String, max_length: 100 }
})

// Virtual for bike_cat URL
comp_cat_schema.virtual('url').get(function () {
  return '/catalog/components/' + this.name
})

// Export model
module.exports = mongoose.model('comp_cat', comp_cat_schema)