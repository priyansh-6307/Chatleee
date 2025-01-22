const bcrypt=require('bcryptjs')
const router=require("express").Router()
const User=require('../models/user')
const jwt=require("jsonwebtoken")
const authenticatetoken=require("./auth")
const Message=require("../models/message")
const { timeStamp } = require('console')


router.post('/sign-up', async (req, res) => {
    try {
        const { Username, Password, Email } = req.body;

        if (!Username || !Password || !Email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (Username.length < 4) {
            return res.status(402).json({ message: "Username should be greater than 4" });
        }
        const existingUsername = await User.findOne({ Username });
        if (existingUsername) {
            return res.status(402).json({ message: "Username Already Exist" });
        }


        const existingEmail = await User.findOne({ Email });
        if (existingEmail) {
            return res.status(403).json({ message: "Email Already Exist" });
        }

       
        const HashedPassword = await bcrypt.hash(Password, 10);

        const newUser = new User({
            Username:Username,
            Email:Email,
            Password: HashedPassword,
            contacts: [] 
        });

      
        await newUser.save();

    
        await User.updateMany(
            {},
            {$push:{contacts:{userId:newUser._id ,username:newUser.Username}}}
           )
       const allUsers= await User.find({_id:{$ne:newUser._id}})
           newUser.contacts=allUsers.map((user)=>({
            userId:user._id,
            username:user.Username
           }))
        await newUser.save();

        return res.status(200).json({ message: "User registered successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error from the server" });
    }
});


router.post('/sign-in', async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const existingUser = await User.findOne({ Email });

        if (!existingUser) {
            return res.status(401).json({ Message: "Invalid credentials" });
        }

        const validPassword = await bcrypt.compare(Password, existingUser.Password);
        if (!validPassword) {
            return res.status(402).json({ Message: "Invalid credentials" });
        }
        
        existingUser.lastLoggedIn = new Date();
        await existingUser.save();

        const authClaims = {
            Username: existingUser.Username,
            Userid: existingUser._id,
        };

        const token = jwt.sign(authClaims, "ChatApp123", { expiresIn: "30d" });
        return res.status(200).json({ token, id: existingUser._id,username:existingUser.Username });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



router.get('/get-user-information',async(req,res)=>{
    try {
        const {id}=req.headers
        const data= await User.findById(id).select("-Password")
        return res.status(200).json(data)
        
    } catch (err) {
        return res.status(500).json({message:'Internal Server Error'})
    }
})





router.get('/active-users',async(req,res)=>{
const fifteenMinutesAgo=new Date(Date.now()-15*60*1000)
try {
    const activeUsers=await User.find({
        lastLoggedIn:{$gte:fifteenMinutesAgo}
    
    })
    return res.status(200).json({activeUsers})
    
} catch (err) {
    return res.status(500).json({message:"Error from the data base"})
    
}
})




module.exports=router