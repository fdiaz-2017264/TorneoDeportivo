'use strict'

const mongoose = require('mongoose'); 

const equipoSchema = mongoose.Schema({
    name: String,
    value: Number,
    goals: Number,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    league: {type: mongoose.Schema.ObjectId, ref: 'League'}
});

module.exports = mongoose.model('Equipos',equipoSchema);