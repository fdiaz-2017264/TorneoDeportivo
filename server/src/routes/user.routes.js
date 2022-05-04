'use strict'

const userController = require('../controller/user.controller');
const express = require('express');
const api = express.Router();


api.get('/test', userController.test);
api.post('/Register', userController.userRegister);
api.post('/login', userController.login);
module.exports = api;