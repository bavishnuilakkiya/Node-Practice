
const mongoose = require('mongoose')
const Schema = mongoose.Schema



const restaurantSchema = new Schema({
         
    restaurant_id: Number,
    restaurant_name: String,
    location_id: Number,
    state_id :Number,
    address :String,
    restaurant_thumb:String,
    average_rating:Number,
    rating_text:String,
    cost:Number,
    contact_number: Number,

    mealTypes:  [{
        mealtype_id:Number,
        mealtype_name:String

    }],

    cuisines : [ {
        cuisine_id: Number,
        cuisine_name: String
    }],
    image_gallery:Array,



})

let Restaurant = mongoose.model("restaurants",restaurantSchema)

module.exports = Restaurant
