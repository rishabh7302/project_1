require('dotenv').config()



const express = require("express");
const hbs = require("hbs");
const cookieParser=require('cookie-parser');
const mongoose = require("mongoose");
const bodyparser=require("body-parser")
const routes = require('./routes/main');
const Detail=require("./models/detail");
const slider=require("./models/slider");
const service=require("./models/service");
const gallery=require("./models/gallery");
const app = express();
const userRoute=require("./routes/user");
const{restrictTOLoggedinUserOnly}=require("./middlewares/auth");


// Set up your view engine and directory
app.set('view engine', 'hbs');
app.set("views", "views");
hbs.registerPartials("views/partials"); // Define the path to your partials

// Static files
app.use(bodyparser.urlencoded ({
  extended:true
}))
app.use('/static', express.static("public"));

// Define your routes middleware
app.use('/', routes);

//for signup
app.use("/user",userRoute);

//for cookies

app.use(cookieParser());



// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/project_1', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Other options
    });
    console.log('Connected to the database');
    

    //  gallery.create([
    //    {
    //      name:"snow",
    //    imageUrl:"/static/images/gallery/pexels-tobias-bjørkli-1887624.jpg"
    //    }
    //  ])

// service.create([
//   {
//     icon:"fa fa-cogs service_icon text-secondary",
//     title:"Provide Best Courses",
//     description:"We provide best courses that helps us student in placement and learning coding",
//     linkText:"https://www.learncodewithrishabh.com",
//     link:"check"
//   },

//   {
//     icon:"fa fa-firefox service_icon text-secondary",
//     title:"Learn Projects",
//     description:"We provide best courses that helps us student in placement and learning coding",
//     linkText:"https://www.learncodewithrishabh.com",
//     link:"Learn"
//   },
//   {
//     icon:"fa fa-pied-piper service_icon text-secondary",
//     title:"Provide Best Courses",
//     description:"We provide best courses that helps us student in placement and learning coding",
//     linkText:"https://www.learncodewithrishabh.com",
//     link:"check"
//   }
//  ])


    //  slider.create([
    //    {
    //      title:"Learn Java in very easy manner",
    //      subTitle:"Java is one of the most popular programming language.",
    //      imageUrl:"/static/images/52465.jpg"
    //    },
    //    {
    //      title:"What is Django in python?",
    //      subTitle:"Django is most famous web framework of pyhton programming.",
    //      imageUrl:"/static/images/6.jpg"
    //    },
    //    {
    //      title:"What about NodeJs",
    //     subTitle:"Nodejs is runtime environment to execute javascript outside browser",
    //     imageUrl:"/static/images/7.jpg"
    //   }

    //  ])
    
    // Detail.create({
    //   brandName:"Rishabh technical solution",
    //   brandIconUrl:"https://img.icons8.com/?size=96&id=MgH5EHKyvgjX&format=png",
    //   links:[
    //     {
    //       label:"Home",
    //       url:"/"
    //     },
    //     {
    //       label:"Services",
    //       url:"/services"
    //     },
    //     {
    //       label:"Gallery",
    //       url:"/gallery"
    //     },
    //     {
    //       label:"About",
    //       url:"/about"
    //     },
    //     {
    //       label:"Contact Us",
    //       url:"/contact-us"
    //     },
          
    //   ]
    // })
  }catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();

const PORT = process.env.PORT || 5556;


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
