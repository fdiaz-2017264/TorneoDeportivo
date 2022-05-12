'use strict'

const userController = require('../controller/user.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.get('/test', userController.test);
api.post('/register', userController.userRegister);
api.post('/login', userController.login);
api.put('/updateUser/:id', mdAuth.ensureAuth, userController.updateUser);
api.delete('/deleteUser/:id', mdAuth.ensureAuth, userController.deleteUser);
api.get('/getUser/:id', mdAuth.ensureAuth, userController.getUser);
api.get('/createAdmin', userController.createAdmin);

//privado
api.post('/saveUser', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.saveUser);
api.put('/update/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.update);
api.delete('/delete/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.delete);
api.get('/getUsers', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.getUsers);

module.exports = api;