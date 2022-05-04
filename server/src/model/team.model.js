'use strict'

const mongoose = require('mongoose'); 

const equipoSchema = mongoose.Schema({
    name: String,
    points: Number,
    goals: Number,
});

module.exports = mongoose.model('Equipos',equipoSchema);