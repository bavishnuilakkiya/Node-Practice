
const mongoose = require('mongoose')

const db = 'zomato'
mongoose.connect(`mongodb://127.0.0.1:27017/${db}`,()=>{ console.log('Mongoose is connected', `to ${db}`)})