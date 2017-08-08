// Inside the burgers_controller.js file, import the following:

// Express
// burger.js

// Create the router for the app, and export the router at the end of your file.

var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});


router.post('/burgers/insertOne', function(req, res) {
  burger.insertOne(['burger_name', 'devoured'], [req.body.burger_name, false],
   function() {
    res.redirect('/');
  });
});

router.put('/burgers/updateOne/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;
  console.log('condition', condition);

  burger.updateOne({devoured: req.body.devoured}, condition, function() {
    res.redirect('/');
  });
});


// Export routes for server.js to use.
module.exports = router;
