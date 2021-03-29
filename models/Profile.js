const {Schema, model, Types} = require('mongoose')

const shema= new Schema({
    name : {type: String, required: true},
    lastname : {type: String, required: true},
    age : {type: Number, required: true},
    code : {type: String, required: true, unique : true},
    owner : [{ type:Types.ObjectId, ref:'User' }]
})

module.exports = model ('Profile', shema)