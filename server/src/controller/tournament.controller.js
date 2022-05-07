'use strict'

const Tournament = require('../model/tournament.model');
const League = require('../model/league.model');

exports.testTournament = (req, res) =>{
    return res.send({message: 'testTournament running'});
}

