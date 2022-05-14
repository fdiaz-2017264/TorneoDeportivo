'use strict'

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const userRoutes = require('../src/routes/user.routes');
const tournamentRoutes = require('../src/routes/tournament.routes');
const leagueRoutes = require('../src/routes/league.routes');
const teamRoutes = require('../src/routes/team.routes');
const scoreRoutes = require('../src/routes/scores.routes')


const app = express(); 

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use('/user', userRoutes);
app.use('/tour', tournamentRoutes);
app.use('/league', leagueRoutes);
app.use('/team', teamRoutes);
app.use('/score', scoreRoutes);



module.exports = app;