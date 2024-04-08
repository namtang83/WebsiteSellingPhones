const User = require("../models/User.js")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

// REGISTER
const registerUser = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    })
    try {
        const saveUser = await newUser.save();
        res.status(201).json(saveUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }   
}

// LOGIN
const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) {
            res.status(401).json("Thông tin không chính xác");
        } else {
            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC );
            const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            if(OriginalPassword !== req.body.password) {
                res.status(401).json("Password không chính xác");
            }
            const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.JWT_SEC, {expiresIn: "3d"})
            const { password, ...others} = user._doc;
            res.status(200).json({...others, accessToken});
        }   
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    registerUser, loginUser
}