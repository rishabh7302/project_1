
const {v4:uuidv4}=require('uuid')
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust the path accordingly
const {setUser}=require('../service/auth');

// For creating a new user
router.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    try {
        await User.create({
            name,
            email,
            password,
        });
        return response.render('index'); // Render the 'index.hbs' page directly
    } catch (error) {
        console.error(error);
        return response.status(500).send('Internal Server Error');
    }
});

// For logging in
router.post('/login', async (request, response) => {
    const { email, password } = request.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) return response.render('login', {
            error: "Invalid Username or Password",
        });
        const sessionId = uuidv4();
        setUser(sessionId, user);
        response.cookie('uid', sessionId);

        return response.render('index'); // Render the 'index.hbs' page directly
    } catch (error) {
        console.error(error);
        return response.status(500).send('Internal Server Error');
    }
});



module.exports = router;


