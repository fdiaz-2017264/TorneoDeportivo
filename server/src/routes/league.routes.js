'use strict'

const leagueController = require('../controller/league.controller');
const express = require('express');
const api = express.Router();

api.get('/testLeague', leagueController.testLeague);
api.post('/saveLeague',  leagueController.saveLeague);
api.delete('/deleteLeague', leagueController.deleteLeague);
api.put('/updatedLeague', leagueController.updatedLeague);

module.exports = api;