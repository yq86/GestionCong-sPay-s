require('../../config/db');
const express = require("express");
const router = express.Router();
const { Holidays } = require("../../models");

// to create Holidays
exports.createHolidays = async (req, res) => {
    try{
        const user = req.body;
        //res.json(user);
        console.log(user)
        await Holidays.create(user).then(createdUser=>{
            res.json(createdUser);
        });
        // if has been working for at least 6 months, create a holidays
        
    }catch (error) {
        res.send(error);
    }
};

exports.getAllUsersHolidays = async (req, res) => {
    try{
        let holidays = await Holidays.findAll();
        console.log(holidays);
        res.json(holidays); // to return the list of users
    }catch (error) {
        res.send(error);
    }
};