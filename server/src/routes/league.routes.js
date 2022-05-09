'use strict'

const leagueController = require('../controller/league.controller');
const express = require('express');
const api = express.Router();

api.get('/testLeague', leagueController.testLeague);
api.post('/saveLeague', mdAuth.ensureAuth,  leagueController.saveLeague);
api.delete('/deleteLeague/:id', mdAuth.ensureAuth, leagueController.deleteLeague);
api.put('/updatedLeague/:id', mdAuth.ensureAuth, leagueController.updatedLeague);

module.exports = api;