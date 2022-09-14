require('../config/db');
const express = require('express');
const holidaysRouter =  express.Router();

const holidaysCtrl = require('./controllers/holidays');

holidaysRouter.post('/create', holidaysCtrl.createHolidays);
holidaysRouter.get('/', holidaysCtrl.getAllUsersHolidays);


module.exports = holidaysRouter;