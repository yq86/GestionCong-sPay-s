require('../config/db');
const express = require('express');
const usersRouter =  express.Router();
const usersCtrl = require('./controllers/users');
const authenticateToken = require('./auth');


usersRouter.post('/create', usersCtrl.createUser);
usersRouter.post('/', authenticateToken, usersCtrl.getAll); // pass the accessToken in req.body to finally securize the backend
usersRouter.post('/getById/:id', authenticateToken, usersCtrl.getUserById);
usersRouter.post('/login', usersCtrl.userLogin);
usersRouter.delete('/logout', authenticateToken, usersCtrl.userLogOut);
usersRouter.post('/token', authenticateToken, usersCtrl.userToken);
usersRouter.delete('/deleteById/:id', authenticateToken, usersCtrl.deleteUserById);
usersRouter.put('/update', authenticateToken, usersCtrl.updateUser);
usersRouter.put('/updateHoliday/:idUser', authenticateToken, usersCtrl.updateUserHoliday);

module.exports = usersRouter;