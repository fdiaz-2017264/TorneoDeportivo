'use strict'

const teamController = require('../controller/team.controller');
const express = require('express');
const api = express.Router();


api.post('/saveEquipos', mdAuth.ensureAuth, teamController.saveEquipos);

api.put('/equiposUpdate/:id', mdAuth.ensureAuth, teamController.equiposUpdate);

api.delete('/equiposDelete/:id', mdAuth.ensureAuth, teamController.equiposDelete);

api.get('/getEquipos', mdAuth.ensureAuth, teamController.getEquipos);


module.exports = api; 