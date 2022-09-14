const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWTSECRET = 'Thisismysecretkeyucanotbreakit'
const fetchUser = require('../middlewares/fetchUser');



//Route 1 http://localhost:5000/api/auth/createuser  use to create new user no login is required

router.post('/createuser',
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be min 5 char').isLength({ min: 5 })
    ],
    async (req, res) => {
        //console.log(req.body);
        //handle errors
        //debugger;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //chaeck whether the user with the email is exist
        let user = await User.findOne({ email: req.body.email });
        //console.log(user);
        if (user) {
            return res.status(400).json({ errors: "Sorry user with same email id already exists" });
        }
        //end chaeck whether the user with the email is exist

        var salt = await bcrypt.genSalt(10);
        var secPassword = await bcrypt.hash(req.body.password, salt);
        //handle errors
        try {
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword
            })

            const data = {
                user: { id: user.id }
            }
            var authtoken = jwt.sign(data, JWTSECRET);

            res.json({ authtoken });
        } catch (error) {
            console.log(error.message);
            //res.status(500).json({ errors: "Sorry user with same email id already exists" });
            return res.status(500).send('internal server error');
        }


        //   .then(user => res.json(user))
        //   .catch(error => {console.log(error.message)
        //     res.json(error.message)
        //   })

    });

//Route 2 http://localhost:5000/api/auth/login  authenticate user using login

router.post('/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be blank').isLength({ min: 1 }),
    ],
async (req, res) => {
    //console.log(req.body);
    //handle errors
    //debugger;
    const errors = validationResult(req);
    console.log('errors is ' + errors); 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    //console.log('email is ' + email); 
    //chaeck whether the user with the email is exist
    try {
        let user = await User.findOne({ email: email });
        //console.log(user);
        if (!user) {
            return res.status(400).json({ errors: "please login with valid credential" });
        }
        //end chaeck whether the user with the email is exist

        const passwordcompare = await bcrypt.compare(password, user.password)
        if (!passwordcompare) {
            return res.status(400).json({ errors: "please login with valid credential" });
        }

        const data = {
            user: { id: user.id }
        }
        var authtoken = jwt.sign(data, JWTSECRET);

        res.json({ authtoken });
    } catch (error) {
        console.log(error.message);
        //res.status(500).json({ errors: "Sorry user with same email id already exists" });
        return res.status(500).send('internal server error');
    }

});

//Route 3 http://localhost:5000/api/auth/getuser   get logged in user details 

router.post('/getuser',fetchUser, async (req, res) => {

    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select('-password'); // '-' means return all value except password
        res.json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('internal server error');
    }

});

module.exports = router