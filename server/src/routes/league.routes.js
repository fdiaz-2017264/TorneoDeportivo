'use strict'

const leagueController = require('../controller/league.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.get('/testLeague', leagueController.testLeague);
api.post('/saveLeague', mdAuth.ensureAuth,  leagueController.saveLeague);
api.delete('/deleteLeague/:id', mdAuth.ensureAuth, leagueController.deleteLeague);
api.put('/updatedLeague/:id', mdAuth.ensureAuth, leagueController.updatedLeague);
api.put('/createScore/:id', mdAuth.ensureAuth, leagueController.createScore);

module.exports = api;