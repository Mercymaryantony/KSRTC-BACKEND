const mongoose=require("mongoose")
const schema = mongoose.Schema({
    "bname":{type:String,required:true},
    "bno":{type:String,required:true},
    "drivername":{type:String,required:true},
    "route":String
    
})
let usermodel = mongoose.model("users",schema)
module.exports={usermodel}