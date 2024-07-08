var express = require('express');
var router = express.Router();
var User = require('./users'); // Import the user model

// GET home page
router.get('/login', function(req, res, next) {

  res.render('login');
});
router.get('/', function(req, res, next) {

  res.render('index');
});
router.get('/check', function(req, res, next) {
  User.find({})
    .then(users => res.render('check', { users }))
    .catch(err => {
      console.error('Error finding users:', err);
      res.status(500).send('Error finding users.');
    });
});

// POST route to handle form submission
router.post('/login', function(req, res, next) {
  // Extract the name from the request body
  const { name } = req.body;

  // Check if the user already exists
  User.findOne({ name })
    .then(existingUser => {
      if (existingUser) {
        // If user exists, send a message
        res.send('User already exists');
      } else {
        // If user does not exist, create a new user document
        const newUser = new User({ name });

        // Save the user document to the database
        newUser.save()
          .then(() => {
            res.redirect('check');
          })
          .catch(err => {
            console.error('Error saving user:', err);
            res.status(500).send('Error saving user.');
          });
      }
    })
    .catch(err => {
      console.error('Error checking for existing user:', err);
      res.status(500).send('Error checking for existing user.');
    });
});


module.exports = router;
