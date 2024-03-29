const { log } = require("console");
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/empform")
.then(()=>{
    console.log("connected");
}).catch((error)=>{
    console.log("errror");
})

