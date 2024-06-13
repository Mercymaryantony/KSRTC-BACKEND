const express =  require("express")
const mongoose =  require("mongoose")
const cors =  require("cors")
const app = express()
const bcrypt =require("bcryptjs")
const jwt =require("jsonwebtoken")
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://mercy1112:mercy1112@cluster0.8x8j3ya.mongodb.net/ksrtcuserDB?retryWrites=true&w=majority&appName=Cluster0")


const {usermodel}=require("./models/user")

const generatepswd = async(pswd)=>{
    const salt =await bcrypt.genSalt(4)
    return bcrypt.hash(pswd,salt)
}

app.post("/login",(req,res)=>{
    let input=req.body
    usermodel.find({"emailid":req.body.email}).then(
        (response)=>{
            if(response.length>0){
                let dbpass = response[0].pass
                console.log(dbpass)
                bcrypt.compare(input.pass,dbpass,(error,isMatch)=>{
                    if (isMatch) {
                        jwt.sign({email:input.emailid},"blog-app",{expiresIn:"1d"},
                            (error,token)=>{
                            if (error) {
                                res.json({"status":"unable to create token"})
                            } else {
                                res.json({"status":"success","userid":response[0]._id,"token":token})
                            }
                        })
                    } else {
                        res.json({"status":"incorrect password"})
                    }
                })
            }
        }
    )
})

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