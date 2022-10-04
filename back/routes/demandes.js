require('../config/db');
const express = require('express');
const demandesRouter =  express.Router();
const demandesCtrl = require('./controllers/demandes');
const authenticateToken = require('./auth');

demandesRouter.post('/create', authenticateToken, demandesCtrl.createDemande);
demandesRouter.get('/', authenticateToken, demandesCtrl.getAllDemandes);
demandesRouter.get('/getById/:id', authenticateToken, demandesCtrl.getDemandeById);
demandesRouter.get('/getByIdUser/:idUser', authenticateToken, demandesCtrl.getDemandeByIdUser);
demandesRouter.delete('/deleteById/:id', authenticateToken, demandesCtrl.deleteDemandeById);
demandesRouter.put('/update', authenticateToken, demandesCtrl.updateDemande);
module.exports = demandesRouter;