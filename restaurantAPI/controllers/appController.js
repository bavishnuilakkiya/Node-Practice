
const express = require("express")
const app = express()

const router = express.Router()


const Location = require("../models/locationModel")
const Restaurant = require("../models/restaurantModel")


// http://localhost:8000/zomato/locations

router.get("/locations",(req,res) =>{

    Location.find( {} ,(err,location) => {
        if (err) res.send("Error to fetch the locations list", err.message)
        res.send(location)

    })
})

//get All restaurants
router.get("/restaurants",(req,res) =>{
    Restaurant.find({},(err,restaurant) => {
        if (err) res.send("Error to fetch the restaurants list", err.message)
        res.send(restaurant)
    })
})

//filter restaurants
// http://localhost:8000/zomato/details?restaurantId=5


router.get("/details/:restaurantId",(req,res) =>{
    let restaurantId= +req.params.restaurantId
   
    let query={}
    
    if( restaurantId) { query= { restaurant_id : restaurantId}  }
    

    Restaurant.find(query,(err,restaurant) => {
        if (err) res.send("Error to fetch the restaurants list", err.message)
        // restaurant.map((data) => console.log(data.restaurant_name))
        res.send(restaurant)
    })
})

//filter restaurants for the menu selected in home page
// http://localhost:8000/zomato/filterRestaurants/1

router.get("/filterRestaurants/:meal_id",(req,res) =>{
    let meal_id = +req.params.meal_id
    
    let lcost = +req.query.lcost
    let hcost = +req.query.hcost
    let stateId = +req.query.stateId
    let cuisineId = +req.query.cuisineId

    let sort = +req.query.sort;
    sort = sort ? sort : 1

    let query={}
    if(meal_id) { query = {"mealTypes.mealtype_id" : meal_id}} 

    if(meal_id && cuisineId) { 
        query = { "mealTypes.mealtype_id" : meal_id,
        $and: [{"cuisines.cuisine_id" : cuisineId } ]} 
    }
    if(meal_id && stateId ) {
        query = { "mealTypes.mealtype_id" : meal_id,
        $and: [{state_id : stateId}] }  
    }

    if(meal_id && stateId && cuisineId) {
        query = { "mealTypes.mealtype_id" : meal_id,
        $and: [{state_id : stateId,"cuisines.cuisine_id" : cuisineId } ]}  
    }
    if(meal_id && lcost && hcost) {
        query = { "mealTypes.mealtype_id" : meal_id,
        $and: [{ cost: { $gt: lcost, $lt: hcost } } ]         
            }
    }
    if(meal_id && lcost && hcost && cuisineId) {
        query = { "mealTypes.mealtype_id" : meal_id, "cuisines.cuisine_id" : cuisineId , 
        $and: [{cost: { $gt: lcost, $lt: hcost } } ]        
            } 
    }
    if(meal_id && lcost && hcost && stateId) {
        query = { "mealTypes.mealtype_id" : meal_id, state_id : stateId ,
        $and: [{ cost: { $gt: lcost, $lt: hcost } }]           
            } 
    }

    if(meal_id && lcost && hcost && stateId && cuisineId) {
        query = {"mealTypes.mealtype_id" : meal_id,state_id : stateId , "cuisines.cuisine_id" : cuisineId,
        $and: [{ cost: { $gt: lcost, $lt: hcost } }]           
            } 
    }

    console.log(query)

    Restaurant.find(query,(err,restaurant) => {
        if (err) res.send("Error to fetch the restaurants list", err.message)
        res.send(restaurant)
    }).sort({cost:sort})
})





module.exports = router