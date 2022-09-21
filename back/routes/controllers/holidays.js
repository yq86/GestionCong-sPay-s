require('../../config/db');
const { Holidays } = require("../../models");

// to create Holidays
exports.getAllUsersHolidays = async (req, res) => {
    try{
        const holidays = await Holidays.findAll();
        res.json(holidays); // to return the list of users
    }catch (error) {
        res.send(error);
    }
};

// get holiday by id user
exports.getHolidayByIdUser = async (req, res) => {
    try {
        const id = req.params.idUser;
        const holiday = await Holidays.findByPk(id);
        res.json(holiday); 
    }catch (error) {
        res.send(error);
    } 
};

// to update holiday
exports.updateHoliday = async (req, res) => {
    try {
        const id = req.body.idUser;  
        let objH = req.body;
        delete objH.idUser;     
        await Holidays.update(objH,{    // update user
            where: { 
                idUser : [id]
            },
            returning: true
        }).then(async ()=>{
            // get and return this user after being updated
            const updatedHoliday = await Holidays.findByPk(id);
            res.json(updatedHoliday); 
        });
    }catch (error) {
        res.send(error);
    } 
};