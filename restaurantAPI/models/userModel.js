const mongoose = require("mongoose")

const schema = mongoose.Schema

const userSchema = new schema({

    name: String,
    email: String,
    password:String,
    phone: Number,
    address:String

})



let user = mongoose.model("users",userSchema)
module.exports = user