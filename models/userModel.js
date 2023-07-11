const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name'],
        maxlength: [40, 'A user name must be less than or equal 40'],
        minlength: [5, 'A user name must be more than or equal 5']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please provide your password'],
        minlength: [8, 'password must be more than or equal 8 characters'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please provide password confirm'],
        minlength: 8,
        validate: {
            //this only work on create and save
            validator: function (val) {
                return val === this.password
            },
            message: 'passsword does not match the confirmed password'
        },
        select: false
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }]
    
})
const User = mongoose.model("User", userSchema)

module.exports = User