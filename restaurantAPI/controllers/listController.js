
const express = require("express")
const app = express()

const router = express.Router()

const Meal = require("../models/mealModel")
const Menu = require("../models/menuModel")

//add mealtypes
router.post("/addMeal",(req,res) => {

    Meal.create({
        mealtype_id : +req.body.mealtype_id,
        mealtype : req.body.mealtype,
        content : req.body.content,
        meal_image : req.body.meal_image

    },(err,result) => {
        if (err) { res.send("Failed to add Mealtype into list.",err.message) }
        res.send("Successfully added to mealtype list")
    })

 } )


//  http://localhost:8000/list/mealtypes?mealId=1
router.get("/mealtypes",(req,res) =>{
    let mealId = +req.query.mealId
    let query = {}

    if(mealId) { query ={ mealtype_id:mealId}}

    Meal.find(query,(err,result) => {
        if (err) res.send("Error to fetch the mealType list", err.message)
        // meal.map((data) => {console.log(data)})
        res.send(result)
    })
})


//add menus
router.post("/addMenu",(req,res) => {

    Menu.create({
        menu_id : +req.body.menu_id,
        menu_name : req.body.menu_name,
        description : req.body.description,
        restaurant_id: +req.body.restaurant_id,
        menu_image : req.body.menu_image,
        menu_type: req.body.menu_type,
        menu_price: req.body.menu_price,

    },(err,result) => {
        if (err) { res.send("Failed to add menus into list.",err.message) }
        res.send("Successfully added to menulist")
        // res.status("200").send("Successfully added to menulist")
    })

 } )

//  http://localhost:8000/list/restaurantMenu?restaurantId=14
// http://localhost:8000/list/restaurantMenu?menuId=70
// http://localhost:8000/list/restaurantMenu?restaurantId=14&menuId=70
router.get("/restaurantMenu",(req,res) =>{
    let restaurantId = +req.query.restaurantId
    let menuId = +req.query.menuId
    let query={}

    if(restaurantId){ query={restaurant_id: restaurantId} }
    if(menuId){ query={menu_id: menuId} }

    if(restaurantId && menuId ){ query={restaurant_id: restaurantId,menu_id: menuId}}
    
    Menu.find(query,(err,result) => {
        if (err) res.send("Error to fetch the menu list", err.message)
        // menu.map((data) => console.log(data))
        res.send(result)
    })
})


module.exports = router