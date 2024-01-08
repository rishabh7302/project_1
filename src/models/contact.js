const mongoose=require('mongoose')

const contact=mongoose.Schema({
    email:String,
    phone:String,
    query:String
})

module.exports=mongoose.model("queries",contact)