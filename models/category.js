const mongoose = require('mongoose')
const Schema = mongoose.Schema

const category_schema = new Schema({
  name: { type: String, max_length: 50 }
})

// Virtual for category URL
category_schema.virtual('url').get(function () {
  return '/catalog/' + this.name
})

// Export model
module.exports = mongoose.model('category', category_schema)
