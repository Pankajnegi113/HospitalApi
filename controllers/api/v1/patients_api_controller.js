const Doctor = require('../../../models/doctor');
const Patient = require('../../../models/patient');
const Report = require('../../../models/report');

//register patient by using doctor only, req.user contain doctor info through JWT
module.exports.register = async function(req,res){
    try{
       
        var doctor= await Doctor.findById(req.user.id);
        if(!doctor)
        {
            throw new Error('Doctor not Found');
        }
        let patient=await Patient.findOne({phone:req.body.phone});
        if(patient)
        {
            return res.status(201).json({
                message:"Patient Already exists",
                patient
            })
        }
        const newPatient=await Patient.create({
            phone:req.body.phone,
            name:req.body.name,
            doctor:req.user
           
        });
        doctor.patient.push(newPatient);
        doctor.save();
        return res.status(200).json({
            message:"Patient Added Successfully",
            newPatient
        })
    }

    catch(err){
        res.json(500,{
            message:'Internal Server Error '+ err.message
        })
    }
}

//create patient report 
module.exports.createReport = async function(req,res){
    try{
        let doctor=await Doctor.findOne({_id:req.user});
        let patient=await Patient.findById(req.params.id);
        console.log(Date());
        if(patient)
        {
            const newreport=await Report.create({
                status:req.body.status,
                patient:req.params.id,
                doctor:req.user,
                date:req.body.date
            });
            patient.report.push(newreport);
            patient.save();
            return res.status(201).json(newreport);
        }
        else{
            return res.status(401).json({
                message:"Patient not found"
            })
        }
    }catch(err){
        return res.status(400).json({
            message:err.message
        })
    }
}

//get all reports of the patient by pasting id of patient in the url 
module.exports.getAllReport = async function(req,res){
    try {
        let patient=await Patient.findById(req.params.id)
        .populate({path: 'doctor', select: ['firstname','username']})
        .populate({path: 'report', options:{sort: {createdAt:1}}})

        return res.status(200).json({
            message:"Reports",
            patient
        })
        
    } catch (err) {
        res.status(400).json({
            message:err.message
        })
    }
}

//get reports by status of all patients in the hospital
module.exports.reportsByStatus = async function(req,res){
    try{
        let report=await Report.find({status:req.params.status});
        if(report)
        {
            return res.status(201).json({
                message:"reports",
                report
            })
        }
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}