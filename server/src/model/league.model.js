'use strict'

const mongoose = require('mongoose');

const leagueSchema = mongoose.Schema({
    name: String,
    description: String,
    //teams: String Aquí van los objects
    /*marcador: [
        {
            //team_name: String
            //resultado: String
        }
    ], */
    stage: number
});

module.exports = mongoose.model('League', leagueSchema);