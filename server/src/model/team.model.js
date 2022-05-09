'use strict'

const mongoose = require('mongoose'); 

const equipoSchema = mongoose.Schema({
    name: String,
    points: Number,
    goals: Number,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Equipos',equipoSchema);