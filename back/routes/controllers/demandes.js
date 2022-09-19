require('../../config/db');
const express = require("express");
const { response } = require('../../app');
const router = express.Router();
const { Demandes } = require("../../models");
const { Holidays } = require("../../models");
const { Types } = require("../../models/Types.js");
const { Users } = require("../../models");
// to create demande
exports.createDemande = async (req, res) => {
    try{
        const demande = req.body;
        demande.idStatus = 1;
        const idUser = req.body.idUser;
        
        // if this user's available holidays are not 0, create demande
        const holiday = await Holidays.findByPk(idUser);
        const date1 = new Date(demande.startingDate);
        const date2 = new Date(demande.endingDate);
        
        const daysDemande = Math.ceil((date2.getTime() - date1.getTime())/ (1000 * 3600 * 24)+1);
       // res.json(daysDemande)
        if(demande.idType ==1 && holiday.holidaysAvailable >= daysDemande){
            await Demandes.create(demande).then(createdDemande=>{
                res.json(createdDemande); // return created demande
            }); 
        } else if(demande.idType == 1 && holiday.holidaysAvailable < daysDemande){
            res.json("you dont have available holidays");
        } else if(demande.idType != 1){
            // create demande
            await Demandes.create(demande).then(createdDemande=>{
                res.json(createdDemande); // return created demande 
            }); 
        }
    } catch (error) {
        res.send(error);
    }
};

exports.getAllDemandes = async (req, res) => {
    try{
        const demandes = await Demandes.findAll();
        console.log(demandes);
        res.json(demandes); // to return the list of users
    }catch (error) {
        res.send(error);
    }
};

exports.getDemandeById = async (req, res) => {
    try {
        const id = req.params.id;
        const demande = await Demandes.findByPk(id);
        res.json(demande); 
    }catch (error) {
        res.send(error);
    } 
};

exports.getDemandeByIdUser = async (req, res) => {
    try {
        const id = req.params.idUser;
        const demandes = await Demandes.findAll({
            where: {
                idUser: [id]
            }
        });
        res.json(demandes); 
    }catch (error) {
        res.send(error);
    } 
};

exports.deleteDemandeById = async (req, res) => {
    try {
        const id = req.params.id;
        const demande = await Demandes.findByPk(id);
        // if this user has holidays, delete his holidays
        if(demande){ 
            if(demande.idStatus !=2 ){
                await Demandes.destroy({
                    where: {
                        id: [id]
                    }
                });
                const demandes = await Demandes.findAll();
                res.json(demandes);
            } else {
                res.json("demande accepted, can not be deleted");
            }    
        }else {
            res.json("demande doesn't exist");
        }
    }catch (error) {
        res.send(error);
    }
};

exports.updateDemande = async (req, res) => {
    try {
        const id = req.body.id;
        const demandeOriginal = await Demandes.findByPk(id);
        const objDemande = req.body; 
        const iduser = demandeOriginal.idUser;
        const idtype = demandeOriginal.idType;
        const status = req.body.idStatus;
        const description = req.body.description;
        
        
        delete objDemande.id;
        if(status == 3){
            if(!description){
                res.json("please specify the reason of refuse");
            } else {
                await Demandes.update(objDemande, {
                    where : {id: [id]}
                });
                const demandes = await Demandes.findByPk(id);
                res.json(demandes);
            }
        } else if(status == 2 && idtype == 1 ){ // if congé payé normale accepted
            await Demandes.update(objDemande, { // update demande status
                where : {id: [id]}
            });
            // update holiday
            const holiday = await Holidays.findOne({
                where: {idUser: iduser}});
            const date1 = new Date(demandeOriginal.startingDate);
            const date2 = new Date(demandeOriginal.endingDate);     
            const daysDemande = Math.ceil((date2.getTime() - date1.getTime())/ (1000 * 3600 * 24)+1);
            const holidaysAvb = holiday.holidaysAvailable-daysDemande;
            const holidaysTaken = holiday.holidaysTaken + daysDemande;
            const holidayUpdate = {
                "holidaysAvailable": holidaysAvb, 
                "holidaysTaken": holidaysTaken
                };
            await Holidays.update(holidayUpdate,{    // update user
                where: { 
                    idUser : iduser
                }, 
            });
            const demande = await Demandes.findByPk(id);
                res.json(demande);
        } else if (status == 2 && idtype != 1 ) { // if other type(maladie...) congé payé accepted
            await Demandes.update(objDemande, { // update demande status
                where : {id: [id]}
            });
            const demande = await Demandes.findByPk(id);
            res.json(demande);
        } else if (status ==1){
            res.json("status did not change");
        }
    }catch (error) {
        res.send(error);
    }
};