const validate= require('./../validator/validate')
const express= require('express')
const router= express.Router()
const userController= require('./../controller/userController')

router.post('/signup',validate.validateUser, userController.signUp)
router.post('/login',userController.login)
router.get('/:id', userController.getOne)
module.exports= router