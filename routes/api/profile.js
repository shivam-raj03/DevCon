const express = require("express");
const axios = require("axios");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const {check, validationResult} = require("express-validator");


const Profile = require("../../models/Profile");
const User = require("../../models/Users");
const Post = require('../../models/Post');


//@route  GET api/profile/me
//@ desc  Get current user profile
//@access private
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate({ model: 'User', path: 'user', select: ['name', 'avatar'] });
        
        if(!profile){
            return res.status(400).json({msg: "There is no profile for this user"});
        }

        res.json(profile);
    } catch(err){
        console.log(err.message);
        res.status(500).send("server error");
    }
});

//@route  Post api/profile
//@ desc  create or update user profile
//@access private

router.post("/", [auth, 
        [
            check("status", "Status is required").not().isEmpty(),
            check("skills", "skills is required").not().isEmpty()
        ]
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            
            return res.status(400).json({ errors: errors.array()});
        }
        
        const {
            company,
            website,
            location,
            status,
            skills,
            bio,
            githubusername,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // build profile field

        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(githubusername) profileFields.githubusername = githubusername;
        if(skills){
            profileFields.skills = skills.split(",").map(skill => skill.trim());
        }
        if(status) profileFields.status = status;

        //build social object
        profileFields.social = {};
        if(youtube) profileFields.social.youtube = youtube;
        if(twitter) profileFields.social.twitter = twitter;
        if(facebook) profileFields.social.facebook = facebook;
        if(linkedin) profileFields.social.linkedin = linkedin;
        if(instagram) profileFields.social.instagram = instagram;
        
        try{
            
            let profile = await Profile.findOne({user: req.user.id});
            
            if(profile){
                profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true});

                return res.json(profile);
            }
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);  
        }catch (err){
            console.log(err.message);
            res.status(500).send("server error");
        }

    }
);

//@route  Get api/profile
//@ desc  Get all profile
//@access public

router.get("/", async (req, res) =>{
    try {
        const profile = await Profile.find().populate({ model: 'User', path: 'user', select: ['name', 'avatar'] });
        res.json(profile);   
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error 111111");
    }
});

//@route  Get api/profile/user/:user_id
//@ desc  Get profile by user id
//@access public

router.get("/user/:user_id", async (req, res) =>{
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate({ model: 'User', path: 'user', select: ['name', 'avatar'] });
        if(!profile){
            return res.status(400).send("Profile not found");
        }
        res.json(profile);   
    } catch (err) {
        console.log(err.message);
        if(err.kind == "objectID"){
            return res.status(400).send("Profile not found");
        }
        res.status(500).send("server error 111111");
    }
});

//@route  Delete api/profile
//@ desc  Delete profile, user and post 
//@access private

router.delete("/", auth, async (req, res) =>{
    try {
        //remove user post
        await this.post.deleteMany({ user: req.user.id});

        //remove profile
        await Profile.findOneAndDelete({user: req.user.id});
        //remove user
        await User.findOneAndDelete({_id: req.user.id});
        res.json({msg: "User removed"});   
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error 111111");
    }
});

//@route  PUT api/profile/experience
//@ desc  add profile experience 
//@access private
router.put("/experience",
    [auth,
        [
            check("title", "Title is required").not().isEmpty(),
            check("company", "Company is required").not().isEmpty(),
            check("from", "From date is required").not().isEmpty()
        ] 
    ], 
    async (req, res) =>{
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        //console.log(req.body);
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }
        //console.log(newExp);
        try {
            const profile = await Profile.findOne({user: req.user.id});
            
            profile.experience.unshift(newExp);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server error");
        }
    }
);

//@route  Delete api/profile/experience
//@ desc  Delete experience from profile
//@access private

router.delete("/experience/:exp_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        

        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

//@route  PUT api/profile/education
//@ desc  add profile education
//@access private
router.put("/education",
    [auth,
        [
            check("school", "School is required").not().isEmpty(),
            check("degree", "Degree is required").not().isEmpty(),
            check("fieldofstudy", "Field of study is required").not().isEmpty(),
            check("from", "From is required").not().isEmpty(),
        ] 
    ], 
    async (req, res) =>{
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        //console.log(req.body);
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;
        
        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }
       
        try {
            const profile = await Profile.findOne({user: req.user.id});
            
            profile.education.unshift(newEdu);
            
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server error");
        }
    }
);

//@route  Delete api/profile/education
//@ desc  Delete education from profile
//@access private

router.delete("/education/:edu_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        

        // Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

//@route  Get api/profile/github/:username
//@ desc  Get user repo from github
//@access public

router.get('/github/:username', async (req, res) =>{
    try {
        const uri = encodeURI(
            `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
          );
          const headers = {
            'user-agent': 'node.js',
            Authorization: `token ${config.get('githubToken')}`
          };
          const gitHubResponse = await axios.get(uri, { headers });
          
          return res.json(gitHubResponse.data);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
});

module.exports = router;