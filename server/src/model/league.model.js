'use strict'

const mongoose = require('mongoose');

const leagueSchema = mongoose.Schema({
    name: String,
    description: String,
    teams: [{ type: mongoose.Schema.ObjectId, ref: 'Equipo' }],
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    tournament: {type: mongoose.Schema.ObjectId, ref: 'Tournament'}
});

module.exports = mongoose.model('League', leagueSchema);