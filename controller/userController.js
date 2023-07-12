const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User= require('./../models/userModel')
const signtoken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


exports.signUp= async(req, res)=>{

    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
           
        })

        const token = signtoken(newUser._id)
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.cookie('jwt', token, cookieOptions)

        res.status(201).json({
            status: 'success',
            token,
            user: newUser
        })
    }catch(err){
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
   
}

exports.login= async(req, res)=>{
   try{

    const { email, password } = req.body
    // 1) check if the email and password exist
    if (!email || !password) {
        throw new Error("Please provide email and password")
    }
    // 2) check if user exist and password correct
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return res.status(401).json({
            status: "Failed",
            message: "invalid eamil or password"
        })
    }

    if(user.password !== password) return res.status(401).json({
        status: "Failed",
        message: "invalid eamil or password"
    })
    user.password = undefined
    const token = signtoken(user._id)
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(200).json({
        status: "success",
        token,
        user
    })
   }catch(err){
    res.status(400).json({
        status: "Failed",
        message: err.message
    })
   }
}

exports.protect=async (req, res, next)=>{
    try{

    
        let token
        // 1) Getting Token and check if it is there
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(" ")[1]
        }

        if (!token) throw new Error('you are not logged in! please login to get access')
        // 2) verification token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

        // 3) check if the user is still exist
        const currenthUser = await User.findById(decoded.id)

        if (!currenthUser) throw new Error('The user belonging to this token does no longer exist')

        req.user = currenthUser
        next()
}catch(err){
    res.status(401).json({
        error: err.message
    })
}
}

exports.getOne= async(req, res)=>{
    try{
        const user= await User.findById(req.params.id).populate('products')

        if(!user) throw new Error("There is no user with given id")
        res.status(200).json({
            status: "success",
            user
        })
    }catch(err){
        res.status(401).json({
            error: err.message
        })
    }
}

exports.getAll= async(req, res)=>{
    try{
        const users= await User.find()

        res.status(200).json({
            status: 'success',
            users
        })
    }catch(err){
        res.status(404).json({
            error: err.message
        })
    }
}

exports.updateUser= async(req, res)=>{
    try{

        const user= await User.findByIdAndUpdate(req.params.id,req.body, {
            new: true,
            runValidators: true
        } )

        if(!user) throw new Error("There is no user with given id")

        res.status(200).json({
            status: 'success',
            user
        })
    }catch(err){
        res.status(404).json({
            error: err.message
        })
    }
}
exports.deleteUser= async(req, res)=>{
    try{

        const user= await User.findByIdAndDelete(req.params.id)

        if(!user) throw new Error("There is no user with given id")

        res.status(200).json({
            status: 'success'
        })
    }catch(err){
        res.status(404).json({
            error: err.message
        })
    }
}