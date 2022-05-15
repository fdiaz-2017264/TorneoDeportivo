'use strict'

const mongoose = require('mongoose'); 

const scoreSchema = mongoose.Schema({
    team1: {type: mongoose.Schema.ObjectId, ref: 'Equipos'},
    goals1: Number,
    team2: {type: mongoose.Schema.ObjectId, ref: 'Equipos'},
    goals2: Number
});

module.exports = mongoose.model('Score', scoreSchema);