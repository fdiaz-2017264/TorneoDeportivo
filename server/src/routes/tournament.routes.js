'use strict'

const tourController = require('../controller/tournament.controller');
const express = require('express');
const api = express.Router();

api.get('/testTour', tourController.testTour);
api.post('/createTour', tourController.createTournament);
api.delete('/deleteTour/:id', tourController.deleteTournament);
api.put('/update/:id', tourController.update)

module.exports = api;