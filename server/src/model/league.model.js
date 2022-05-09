'use strict'

const mongoose = require('mongoose');

const leagueSchema = mongoose.Schema({
    name: String,
    description: String,
    teams: [{ type: mongoose.Schema.ObjectId, ref: 'Equipo' }],
    score: [
        {
            team1: { type: mongoose.Schema.ObjectId, ref: 'Equipo' },
            results1: Number,
            team2: { type: mongoose.Schema.ObjectId, ref: 'Equipo' },
            results2: Number
        }
    ],
    user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('League', leagueSchema);