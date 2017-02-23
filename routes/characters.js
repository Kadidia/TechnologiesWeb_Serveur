var express = require('express');
var router = express.Router();

const CharacterDAO = require('../models/CharacterDAO');

/* GET all characters*/
router.get('/', function(req, res, next){
    CharacterDAO.getAll()
    .then((result) =>{
        res.status(200)
        .json({
            status: 'success',
            characters: result
        })
    }).catch(function(error){
        res.status(500)
        .json({
            status: 'Error',
            message: error
        })
    })
});

router.get('/:id', function(req, res, next){
    var id = (req.params.id);
    CharacterDAO.getById(id)
    .then((result) => {
        res.status(200)
        .json({
            status: 'success',
            character: result[0]
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
  var name = (req.body.character.name);
  var user_id = (req.body.character.user_id);
  var classe = (req.body.character.class);
  var x = (req.body.character.position.x);
  var y = (req.body.character.position.y);

  CharacterDAO.postCharacter(name, user_id, classe, x, y)
  .then((result) => {
    res.status(200)
    .json({
      status: "success",
      message: "Inserted one character",
      character: result[0]
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
  CharacterDAO.deleteCharacter(id)
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
  var name = (req.body.character.name);
  var user_id = (req.body.character.user_id);
  var classe = (req.body.character.class);
  var x = (req.body.character.position.x);
  var y = (req.body.character.position.y);

  CharacterDAO.putCharacter(id, name, user_id, classe, x, y)
  .then((result) => {
    res.status(200)
    .json({
      status: 'success',
      message: 'modified a character',
      character: result[0]
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

router.get('/all/:class', function(req, res, next){
      var classe = (req.params.class);
    CharacterDAO.getOneClassCharacters(classe)
    .then((result) => {
        res.status(200)
        .json({
            status : 'success',
            characters: result
        })
    })
});

router.get('/:id/:allies/:radius', function(req, res, next){
      var id = (req.params.id);
      var radius = (req.params.radius);
    CharacterDAO.getAroundAllies(id)
    .then((result) => {
        res.status(200)
        .json({
            status : 'success',
            characters: result
        })
    })
})




module.exports = router;
