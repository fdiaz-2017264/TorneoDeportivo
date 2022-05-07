'use strict'

const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schemo({
    name: String,
    league: [
        {
            ObjectId
        }
    ],
    author: ObjectId

});

module.exports = mongoose.modul('Invoice', invoiceSchema)