'use strict'

const teamController = require('../controller/team.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated')


api.post('/saveEquipos', mdAuth.ensureAuth, teamController.saveEquipos);

api.put('/equiposUpdate/:id', mdAuth.ensureAuth, teamController.equiposUpdate);

api.delete('/equiposDelete/:id', mdAuth.ensureAuth, teamController.equiposDelete);

api.get('/getEquipos', mdAuth.ensureAuth, teamController.getEquipos);

api.get('/getTeam/:id', mdAuth.ensureAuth, teamController.getTeam);

module.exports = api; 