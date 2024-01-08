const express=require('express')
const {route}=require("express/lib/application");
const async=require("hbs/lib/async");
const contact=require("../models/contact")
const routes=express.Router()
const Detail=require("../models/detail")
const slider=require("../models/slider")
const service=require("../models/service")
const gallery=require("../models/gallery")

routes.get("/",async(req,res)=>{

    const details= await Detail.findOne({"_id":"6561388328f0b2bf1f5d39eb"});
    const slides =await slider.find();
    const services=await service.find();
   // console.log(details)
   //console.log(slides)
   //console.log(services)
    res.render("index.hbs",{
        details:details,
        slides:slides,
        services:services,
        
    });
});

routes.get('/gallery', async (req, res) => {
    const details = await Detail.findOne({ "_id": "6561388328f0b2bf1f5d39eb" });

    // Use a different name for the variable to avoid naming conflict
    const galleryData = await gallery.find();

    res.render('gallery.hbs', {
        details: details,
        gallery: galleryData, // Update the variable name here as well
    });
});


routes.post("/process-contact-form",async(request,response)=>{
    console.log("This form is submitted")
    console.log(request.body)
    //save the data to database
    try{
        const data= await contact.create(request.body)
        console.log(data)
        response.redirect("/")

    }catch(e)
    {
        console.log(e)
        response.redirect("/")
    }
});

routes.get('/signup', async (req, res) => {
    try {
        const details = await Detail.findOne({ "_id": "6561388328f0b2bf1f5d39eb" });
        const slides = await slider.find();
        const services = await service.find();
        res.render("signup.hbs")
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
routes.get('/login', async (req, res) => {
    try {
        const details = await Detail.findOne({ "_id": "6561388328f0b2bf1f5d39eb" });
        const slides = await slider.find();
        const services = await service.find();
        res.render("login.hbs");
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});





module.exports=routes




