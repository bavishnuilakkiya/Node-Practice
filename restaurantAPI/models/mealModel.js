
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const mealSchema = new Schema({
    
    mealtype_id :{ type: Number, required: true},
    mealtype : { type: String, required: true},
    content : { type: String, required: true},
    meal_image :{ type: String, required: true}

})

const meal = mongoose.model("restaurantmeals", mealSchema)

module.exports = meal