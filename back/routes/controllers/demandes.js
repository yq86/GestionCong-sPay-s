require('../../config/db');
const express = require("express");
const { response } = require('../../app');
const router = express.Router();
const { Demandes } = require("../../models");
// to create demande
exports.createDemande = async (req, res) => {
    try{
        const demande = req.body;
        // if this user's available holidays are not 0, create demande
        
        await Demandes.create(demande).then(createdDemande=>{
            res.json(createdDemande); // return created user
        });    
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
        });;
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
            await Demandes.destroy({
                where: {
                    id: [id]
                }
            });
        }
        // delete this user
        res.json("demande deleted");
    }catch (error) {
        res.send(error);
    }
};