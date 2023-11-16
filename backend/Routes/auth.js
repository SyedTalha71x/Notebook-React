const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "TalhaExtension";

router.post('/createuser', [
    // creating validations for user
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password length must be 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    // if their are errors return bad requests and some errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        //Check weather the user already exists in db
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({ success, error: "sorry a user with this email is already exists" });
        }

        //converting password hashing and salt
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);



        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });

        const data = {
            "user": {
                id: user.id
            }
        }

        const AuthToken = jwt.sign(data, JWT_SECRET);
        console.log(AuthToken);
        success = true;

        res.json({ success, AuthToken });


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some Error Occurred" });

    }
})

// Authenticate a user using : POST   No login required 

router.post('/login', [

    // creating validations for user
    body('email', 'enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()

], async (req, res) => {
    let success = false;
    // if their are errors return bad requests and some errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {

        // check if email and password matches with that user in databases

        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "please try to login with correct creditenials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "please try to login with correct creditenials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const AuthToken = jwt.sign(data, JWT_SECRET);
        console.log(AuthToken);
        success = true;

        res.json({ success, AuthToken });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some  Internal Errors Occurred" });
    }
})


// get user login required 
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some  Internal Errors Occurred" });
    }
})

module.exports = router