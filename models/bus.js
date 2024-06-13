const mongoose=require("mongoose")
const schema = mongoose.Schema({
    "bname":{type:String,required:true},
    "bno":{type:String,required:true},
    "drivername":{type:String,required:true},
    "route":String
    
})
let busmodel = mongoose.model("buss",schema)
module.exports={busmodelmodel}