const express =  require("express")
const mongoose =  require("mongoose")
const cors =  require("cors")
const app = express()
const bcrypt =require("bcryptjs")
app.use(cors())
app.use(express.json())

const {usermodel}=require("./models/user")

const generatepswd = async(pswd)=>{
    const salt =await bcrypt.genSalt(4)
    return bcrypt.hash(pswd,salt)
}

app.post("/signup",async(req,res)=>{
    let input = req.body
    let hashedpswd=await generatepswd(input.pass)
    console.log(hashedpswd)
    input.pass=hashedpswd
    let users = new usermodel(input)
    users.save()
    res.json({"status":"SIGNUP"})
    })

    app.listen(8805,()=>{
        console.log("server started")
    })