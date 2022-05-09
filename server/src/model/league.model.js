'use strict'

const mongoose = require('mongoose');

const leagueSchema = mongoose.Schema({
    name: String,
    description: String,
    teams:[{type: moongose.Schema.ObjectId, ref:'Equipos'}],
    score:[
        {
            team1: {type:moongose.Schema.ObjectId, ref:'Equipos'},
            results1: Number,
            teams2: {type: moongose.Schema.ObjectId, ref:'Equipos'},
            results2: Number
        }
    ],
    stage: Number
});

module.exports = mongoose.model('League', leagueSchema);