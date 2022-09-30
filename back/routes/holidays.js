require('../config/db');
const express = require('express');
const holidaysRouter =  express.Router();
const holidaysCtrl = require('./controllers/holidays');

holidaysRouter.get('/', holidaysCtrl.getAllUsersHolidays);
holidaysRouter.get('/getByIdUser/:idUser', holidaysCtrl.getHolidayByIdUser);
module.exports = holidaysRouter;