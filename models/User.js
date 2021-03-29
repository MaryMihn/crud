const {Schema, model, Types} = require('mongoose')

const shema= new Schema({
    email : {type: String, required: true},
    password : {type: String, required: true},
    links : [{ type:Types.ObjectId, ref:'Profile' }]
})

module.exports = model ('User', shema)