const Doctor = require('../../../models/doctor');
const jwt=require('jsonwebtoken');
module.exports.register= async function (req,res){
    try{
        await Doctor.create(req.body);
        return res.json(200,{
            messgae:'Doctor registered successfully',
        
        })
    }
    catch(err){
        res.json(500,{
            message:'Internal Server Error'
        })
    }
}

module.exports.login=async function(req,res)
{
    try{
        let doctor=await Doctor.findOne({username:req.body.username});
        if(!doctor||doctor.password!=req.body.password)
        {
            return res.status(422).json({
                message:"Invalid username or password"
            });
        }
        return res.status(200).json({
            message:'Sign in successfully',
            data:{
                token:jwt.sign(doctor.toJSON(),'hospital_api',{expiresIn:'10000000'})
            }
        });
    }
    catch(err)
    {
        return res.json(500,{
            message:'Internal Server error'
        })
    }
}