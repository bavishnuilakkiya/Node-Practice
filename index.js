
const express = require('express')
const app = express()
const cors = require('cors')
const db = require("./db")

const ZomatoController = require("../restaurantAPI/controllers/appController")

const listController = require("../restaurantAPI/controllers/listController")


const port = 8000



app.get("/",(req,res) => {
    res.send('Welcome')
})

app.use(cors())
app.use(express.json())



app.use("/zomato",ZomatoController)

app.use("/list",listController)

app.listen(port,()=> console.log("Server is connected to port",port))

