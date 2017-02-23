var express = require('express');
var router = express.Router();

const UserDAO = require('../models/UserDAO');

/* GET users listing. */
router.get('/', function(req, res, next) {
  UserDAO.getAll()
  .then((result) => {
    res.status(200)
    .json({
      status: "success",
      users: result
    })
  })
});

router.get('/:id', function(req, res, next){
  var id = (req.params.id);
  UserDAO.getById(id)
  .then((result) => {
    res.status(200)
    .json({
      status: "success",
      user: result[0]
    })
  })
  .catch(function(error){
    res.status(500)
    .json({
      status: 'Error',
      message: error
    })
  })
});

router.post('/', function(req, res, next){
  var id = (req.body.user.id);
  var name = (req.body.user.name);
  var email = (req.body.user.email);
  var alliance = (req.body.user.alliance_id);

  console.log(name + " " + email + " " + alliance);

  UserDAO.postUser(name, email, alliance)
  .then((result) => {
    res.status(200)
    .json({
      status: "success",
      message: "Inserted one user",
      user: result[0]
    })
  })
  .catch(function(error){
    res.status(500)
    .json({
      status: 'Error',
      message: error
    })
  })
});

router.delete('/:id', function(req, res, next){
  var id = (req.params.id);
  UserDAO.deleteUser(id)
  .then((result) => {
    res.status(200)
    .json({
      status: "success",
      message: result
    })
  })
  .catch(function(error){
    res.status(500)
    .json({
      status : 'Error',
      message : error
    })
  })
});

router.put('/:id', function(req, res, next){
  var id = (req.params.id);
  var name = (req.body.user.name);
  var email = (req.body.user.email);
  var alliance = (req.body.user.alliance_id);

  UserDAO.putUser(id, name, email, alliance)
  .then((result) => {
    res.status(200)
    .json({
      status: 'success',
      message: 'modified a user',
      user: result[0]
    })
  })
  .catch(function(error){
    res.status(500)
    .json({
      status : 'Error',
      message : error
    })
  })
});

router.get('/:id/characters', function(req, res, next){
      var id = (req.params.id);
    UserDAO.getOneUserCharacters(id)
    .then((result) => {
        res.status(200)
        .json({
            status : 'success',
            characters: result
        })
    })
})


module.exports = router;
