const mongoose=require('mongoose');
const ReportSchema=new mongoose.Schema({
    status:{
        type:String,
        required:true,
        enum:['Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive-Admit']
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient'
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    },
    date:{
        type:String
    }
},{
    timestamps:true
});
const Report=mongoose.model('Report',ReportSchema);
module.exports=Report;