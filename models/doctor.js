const mongoose=require('mongoose');
const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    patient:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient'
    }]
  },
    {timeStamps:true}
);

const Doctor=mongoose.model('Doctor',doctorSchema);
module.exports=Doctor;