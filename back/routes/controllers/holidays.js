require('../../config/db');
const express = require("express");
const router = express.Router();
const { Holidays } = require("../../models");

// to create Holidays
exports.getAllUsersHolidays = async (req, res) => {
    try{
        const holidays = await Holidays.findAll();
        console.log(holidays);
        res.json(holidays); // to return the list of users
    }catch (error) {
        res.send(error);
    }
};

exports.getHolidayByIdUser = async (req, res) => {
    try {
        const id = req.params.idUser;
        const holiday = await Holidays.findByPk(id);
        res.json(holiday); 
    }catch (error) {
        res.send(error);
    } 
};