require('../config/db');
const express = require('express');
const holidaysRouter =  express.Router();
const holidaysCtrl = require('./controllers/holidays');
const authenticateToken = require('./auth');


// holidaysRouter.get('/', authenticateToken, holidaysCtrl.getAllUsersHolidays);
// holidaysRouter.get('/getByIdUser/:idUser', authenticateToken, holidaysCtrl.getHolidayByIdUser);

// function test
holidaysRouter.get('/', holidaysCtrl.getAllUsersHolidays);
holidaysRouter.get('/getByIdUser/:idUser', holidaysCtrl.getHolidayByIdUser);

module.exports = holidaysRouter;