'use strict'

const scoreController = require('../controller/scores.controller')
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.post('/createScore', mdAuth.ensureAuth, scoreController.createScore);
api.get('/getScores', mdAuth.ensureAuth, scoreController.getScores)
module.exports = api;