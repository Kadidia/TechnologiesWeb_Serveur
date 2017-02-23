var express = require('express');
var router = express.Router();

const AllianceDAO = require('../models/AllianceDAO');

/* GET all alliances*/
router.get('/', function(req, res, next){
    AllianceDAO.getAll()
    .then((result) =>{
        res.status(200)
        .json({
            status: 'success',
            alliances: result
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
    AllianceDAO.getById(id)
    .then((result) => {
        res.status(200)
        .json({
            status: 'success',
            alliance: result[0]
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
  var name = (req.body.alliance.name);
  AllianceDAO.postAlliance(name)
  .then((result) => {
    res.status(200)
    .json({
      status: "success",
      message: "Inserted one alliance",
      alliance: result[0]
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
  AllianceDAO.deleteAlliance(id)
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
  var name = (req.body.alliance.name);

  AllianceDAO.putAlliance(id, name)
  .then((result) => {
    res.status(200)
    .json({
      status: 'success',
      message: 'modified a alliance',
      alliance: result[0]
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

router.get('/:id/users', function(req, res, next){
      var id = (req.params.id);
    AllianceDAO.getOneAllianceUsers(id)
    .then((result) => {
        res.status(200)
        .json({
            status : 'success',
            users: result
        })
    })
});

router.get('/:id/characters', function(req, res, next){
      var id = (req.params.id);
    AllianceDAO.getOneAllianceCharacters(id)
    .then((result) => {
        res.status(200)
        .json({
            status : 'success',
            characters: result
        })
    })
});

router.get('/:id/characters/:class', function(req, res, next){
      var id = (req.params.id);
      var classe = (req.params.class);
    AllianceDAO.getOneAllianceCharactersandClass(id, classe)
    .then((result) => {
        res.status(200)
        .json({
            status : 'success',
            characters: result
        })
    })
})



module.exports = router;
