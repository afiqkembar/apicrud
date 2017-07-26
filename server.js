  // Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Crud = require('./models/crud');

// Connect to the crudlocker MongoDB
mongoose.connect('mongodb://afiq:123@ds123933.mlab.com:23933/crud');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on crud!' });
});

// Create a new route with the prefix /cruds
var crudsRoute = router.route('/Cruds');

// Create endpoint /api/cruds for POSTS
crudsRoute.post(function(req, res) {
  // Create a new instance of the crud model
  var crud = new Crud();

  // Set the crud properties that came from the POST data
    crud.name = req.body.name;
    crud.description = req.body.description;
    crud.location = req.body.location;
    crud.image = req.body.image;

  // Save the crud and check for errors
  crud.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Crud added to the locker!', data: crud });
  });
});

// Create endpoint /api/cruds for GET
crudsRoute.get(function(req, res) {
  // Use the Crud model to find all crud
  Crud.find(function(err, cruds) {
    if (err)
      res.send(err);

    res.json(cruds);
  });
});

// Create a new route with the /cruds/:crud_id prefix
var crudRoute = router.route('/cruds/:crud_id');

// Create endpoint /api/cruds/:crud_id for GET
crudRoute.get(function(req, res) {
  // Use the crud model to find a specific crud
  Crud.findById(req.params.crud_id, function(err, crud) {
    if (err)
      res.send(err);

    res.json(crud);
  });
});

// Create endpoint /api/cruds/:crud_id for PUT
crudRoute.put(function(req, res) {
  // Use the Crud model to find a specific crud
  Crud.findById(req.params.crud_id, function(err, crud) {
    if (err)
      res.send(err);

    // Update the existing crud quantity
    crud.quantity = req.body.quantity;

    // Save the crud and check for errors
    crud.save(function(err) {
      if (err)
        res.send(err);

      res.json(crud);
    });
  });
});

// Create endpoint /api/cruds/:crud_id for DELETE
crudRoute.delete(function(req, res) {
  // Use the Crud model to find a specific crud and remove it
  Crud.findByIdAndRemove(req.params.crud_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Crud removed from the locker!' });
  });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert crud on port ' + port);
