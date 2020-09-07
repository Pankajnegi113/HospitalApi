const express=require('express');
const passport=require('passport');
const router=express.Router();
//get patientController
const patientControlller = require('../../../controllers/api/v1/patients_api_controller');
//register patient
router.post('/register',passport.authenticate('jwt',{session:false}),patientControlller.register);
//create patient report
router.post('/:id/create_report',passport.authenticate('jwt',{session:false}),patientControlller.createReport);
//get all reports associated to a patient
router.get('/:id/all_reports',passport.authenticate('jwt',{session:false}),patientControlller.getAllReport);
//get all reports of patients on the basis of status
router.get('/reports/:status',passport.authenticate('jwt',{session:false}),patientControlller.reportsByStatus);
module.exports=router;