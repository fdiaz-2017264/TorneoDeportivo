'use strict'

const mongoose = require('mongoose');

const TournamentSchema = mongoose.Schema({
    name: String,
    author: {type: mongoose.Schema.ObjectId, ref: 'User'},

});

module.exports = mongoose.model('Tournament', TournamentSchema)
