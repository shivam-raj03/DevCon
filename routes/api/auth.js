const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult} = require("express-validator");

const User = require("../../models/Users");

//@route  GET api/auth
//@ desc  Test route
//@access Public
router.get("/", auth, async (req, res) => {
    
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).send("server error");
    }
});

//@route  Post api/auth
//@ desc  Authenticate user and get token
//@access Public
router.post("/",
    [
        
        check("email", "Please inlcude valid email").isEmail(),
        check("password", "Password required").exists()
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            
            return res.status(400).json({ errors: errors.array()});
        }

        const {email, password} = req.body;

        try{

            // If user exists
            let user = await User.findOne({email});
            
            if(!user){
                return res.status(400).json({errors: [{msg: "Invalid credentials"}]}); 
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({errors: [{msg: "Invalid credentials"}]});
            }
           

            //jsonwebtoken
            const payload = {
                user:{
                    id : user.id
                }
            }
            jwt.sign(
                payload, 
                config.get("myToken"),
                {expiresIn: 360000},
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            )
            
        }catch (err){
            console.log(err.message);
            res.status(500).send("Server error");
        }    
    }    
);


module.exports = router;