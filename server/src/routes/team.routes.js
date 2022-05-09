'use strict'

const teamController = require('../controller/team.controller');
const express = require('express');
const api = express.Router();


api.post('/saveEquipos', teamController.saveEquipos);

api.put('/equiposUpdate/:id', teamController.equiposUpdate);

api.delete('/equiposDelete/:id',teamController.equiposDelete);

api.get('/getEquipos', teamController.getEquipos);


module.exports = api; 