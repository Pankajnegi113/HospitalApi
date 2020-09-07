const express=require('express');
const router=express.Router();
console.log("adadas");
const docControlller = require('../../../controllers/api/v1/doctors_api_controller');
//register the doctor
router.post('/register',docControlller.register);
//login the doctor by username and password
router.get('/login',docControlller.login);
module.exports=router;