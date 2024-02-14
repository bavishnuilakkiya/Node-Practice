const express = require("express")
const User= require("../../restaurantAPI/models/userModel")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config")

const router = express.Router()


router.get("/welcome",(req,res)=>{
    res.send("Success")
})
router.post("/register",(req,res) => {
    let hasedPassword = bcrypt.hashSync(req.body.password,8)
    console.log(hasedPassword)
  
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : hasedPassword,
        phone : req.body.phone,
        address : req.body.address
    },(err,result) => {
        if (err) { res.send("Registration has failed.",err.message) }
        res.send("Registration done successfully")
    })
   
    
})

router.post("/login",(req,res) =>{
    User.findOne({email : req.body.email},(err,user) =>{
        if (err) return res.send ({auth:false,token:" Error while login"})
        console.log(user)
        if(!user) return res.send({auth:false,token:"Invalid Credential"})
        else {
            const passwordCheck = bcrypt.compareSync( req.body.password,user.password)
            if (!passwordCheck) return res.send({auth:false,token:"Invalid Credential"}) 
            else {
                let token = jwt.sign({id:user._id},config.secret,{expiresIn:600})
                res.send( res.send({auth:true,token:token}))
            }
        }
    })
})


router.get("/users",(req,res) => {
    User.find({},(err,user) =>{
        if (err) res.send( "Error while getting user data")
        res.send({Status:"Success",user})
    })
})

router.get("/userInfo",(req,res) =>{
    let token = req.headers["x-access-token"]
    console.log(token)

    if(!token) res.send({auth:false,token:"No token"})
    else{
    jwt.verify(token,config.secret,(err,user)=> {
        if (err) res.send({auth:false,token:"Invalid Token"})
        User.findById(user.id,(err,result) => {
            // if (err) res.send({auth:false,token:"Unable to get the user details"})
            res.send({auth:true,status:"Success",details:result})
    })
})
    }
})

module.exports = router