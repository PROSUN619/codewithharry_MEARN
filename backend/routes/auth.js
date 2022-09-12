const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWTSECRET = 'Thisismysecretkeyucanotbreakit'
//http://localhost:3000/api/auth/createuser  use to create new user no login is required

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
                user : {id : user.id} 
            }
            var authtoken = jwt.sign(data, JWTSECRET);
            
            res.json({authtoken});
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

module.exports = router