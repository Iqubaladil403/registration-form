const mongoose=require("mongoose");
const empSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const empCollection=new mongoose.model("empCollection", empSchema);
module.exports=empCollection;