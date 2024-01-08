const mongoose=require("mongoose")

const gallery=mongoose.Schema({
    name:String,
    imageUrl:String,
})

module.exports=mongoose.model('gallery',gallery)