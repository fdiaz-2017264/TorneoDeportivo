'use strict'

const mongoose = require('mongoose');

const TournamentSchema = mongoose.Schema({
    name: String,
    league: [
        {
            type: mongoose.Schema.ObjectId, ref: 'League'
        }
    ],
    author: {type: mongoose.Schema.ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Tournament', TournamentSchema)
