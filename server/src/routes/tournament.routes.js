'use strict'

const tourController = require('../controller/tournament.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.get('/testTour', tourController.testTour);
api.post('/createTour', [mdAuth.ensureAuth, mdAuth.isAdmin], tourController.createTournament);
api.delete('/deleteTour/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], tourController.deleteTournament);
api.put('/update/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], tourController.update)
api.get('/getTournaments', [mdAuth.ensureAuth,], tourController.getTournaments);
api.get('/getTournament/:id', [mdAuth.ensureAuth], tourController.getTournament);


module.exports = api;