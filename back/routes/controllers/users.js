require('../../config/db');
const express = require("express");
const { response } = require('../../app');
const router = express.Router();
const { Users } = require("../../models");
const { Holidays } = require("../../models");
// to create users
exports.createUser = async (req, res) => {
    try{
        const user = req.body;
        await Users.create(user).then(createdUser=>{
            res.json(createdUser); // return created user
            const idUser = createdUser.id;
            const startingDate = createdUser.firstWorkingDay;
            // to get the date of 6 months after first working date
            const worked6months = new Date(new Date(startingDate).setMonth(new Date(startingDate).getMonth()+6));
            const role = createdUser.role;
            // if user is an employee or manager, and has been working for at least 6 months, create a holidays
            if(role==2||role==3){// if user is an employee or a manager
                if( !(new Date()<worked6months)){ // if this employee has been working for more than 6 months
                    // to calculate days of congés payés
                    console.log("good");
                    const totalConge = calculateCongesPayes(startingDate);
                    const holiday = {
                        "idUser": [idUser],
                        "holidaysAvailable": totalConge,
                        "holidaysTaken": 0
                        };
                    Holidays.create(holiday); //to create this employee's paid leaves
                }
            }    
        });    
    } catch (error) {
        res.send(error);
    }
};
// to get all the users
exports.getAll = async (req, res) => {
    try{
        const users = await Users.findAll();
        res.json(users); // to return the list of users
    }catch (error) {
        // res.send(error);
    }
};

// to get user by id
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findByPk(id);
        res.json(user); 
    }catch (error) {
        res.send(error);
    }    
};

// to get user by userName
exports.getUserByUserName = async (req, res) => {
    try{
        const userName = req.body.userName;
        const user = await Users.findOne({
                where: {
                    userName: [userName]
                }
            });
        res.json(user);
    }catch (error) {
        res.send(error);
    }
};


// to delete user by id
exports.deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const holiday = await Holidays.findByPk(id);
        // if this user has holidays, delete his holidays
        if(holiday){ 
            await Holidays.destroy({
                where: {
                    idUser: [id]
                }
            });
        }
        // delete this user
        await Users.destroy({
            where: {
                id: [id]
            }
        }); 
        res.json("user and user's holidays are deleted");
    }catch (error) {
        res.send(error);
    }
};

// to update user
exports.updateUser = async (req, res) => {
    try {
        const id = req.body.id;
        const user = await Users.findByPk(id);
        const firstWorkingDateOriginal = user.firstWorkingDay;       
        let objUser = req.body;
        
        delete objUser.id;
        
        await Users.update(objUser,{    // update user
            where: { 
                id : [id]
            },
            returning: true
        }).then(async ()=>{

            // get and return this user after being updated
            const updatedUser = await Users.findByPk(id);
            const role = updatedUser.role;
            res.json(updatedUser) ; // return updated user
             // update this user's holiday if updated user's firstworking day is changed
            if(role==2 || role==3){
                const firstWorkingDateUpdated = updatedUser.firstWorkingDay;
                if(firstWorkingDateOriginal != firstWorkingDateUpdated){
                    // recalculate paid leaves
                    const totalPaidLeaves = calculateCongesPayes(firstWorkingDateUpdated);
                    const holiday = await Holidays.findByPk(id);
                    const holidaysTaken = holiday.holidaysTaken;
                    const holidaysAvailable = totalPaidLeaves - holidaysTaken;
                    const holidayUpdate = {
                        "holidaysAvailable": holidaysAvailable, 
                        "holidaysTaken": [holidaysTaken]
                        };
                    Holidays.update(holidayUpdate,{    // update user
                        where: { 
                            idUser : [id]
                        }
                    });    
                }
            }
        });
       // if (!updatePeople) throw ('Error while Updating');
    }catch (error) {
        res.send(error);
    }
};


function calculateCongesPayes(startingDate){
      const fullMonths = new Date().getMonth() -startingDate.getMonth()-1 +12 * (new Date().getFullYear() - startingDate.getFullYear());
                console.log(fullMonths);
             // to calculate worked days of current month
                const today = new Date();
                const num = today.getDate();
                let daysPast = 0;
                for(let i=1; i<=num; i++){     
                    today.setDate(i);
                    let day = today.getDay();
                    if(!(day==0 || day == 6)){
                        daysPast += 1;
                    }               
                }
                
// to calculate worked days of first working months
                const firstWorkingDay = startingDate.getDate();
                
                const year = startingDate.getFullYear();
                const month = startingDate.getMonth()+1;
                const days = new Date(year, month, 0).getDate();

                let daysWorked = 0;
                for(let i=firstWorkingDay; i<=days; i++){     
                    startingDate.setDate(i);
                    let day = startingDate.getDay();
                    if(!(day==0 || day == 6)){
                        daysWorked += 1;
                    }               
                }   
                const totalConge = parseFloat(fullMonths*2.5 + 2.5/21*(daysPast+daysWorked)).toFixed(1); 
                return totalConge;
}