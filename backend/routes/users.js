const router = require('express').Router();
let User = require('../models/user.model');

//first route, incoming git request 

router.route('/').get((req, res) => {
  User.find() //get the list of users from mongodb 
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//post request 
router.route('/add').post((req, res) => {
  const username = req.body.username; 

  const newUser = new User({username});

  newUser.save() //save to the database 
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;