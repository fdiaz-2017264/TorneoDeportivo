'use strict'

const tournamentController = require('../controller/tournament.controller');
const api = express.Router();

api.get('/testTournament', tournamentController.testTournament);

module.exports = api;