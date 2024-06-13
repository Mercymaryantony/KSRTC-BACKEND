const mongoose=require("mongoose")
const schema = mongoose.Schema({
    "name":{type:String,required:true},
    "emailid":{type:String,required:true},
    "phno":{type:String,required:true},
    "gender":String,
    "pass":{type:String,required:true}
})
let usermodel = mongoose.model("users",schema)
module.exports={usermodel}