// Load required packages
var mongoose = require('mongoose');

// Define our crud schema
var CrudSchema   = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  image: String
});

// Export the Mongoose model
module.exports = mongoose.model('Crud', CrudSchema);
