const validate= require('./../validator/validate')
const express= require('express')
const router= express.Router()
const userController= require('./../controller/userController')

router.post('/signup',validate.validateUser, userController.signUp)
router.post('/login',userController.login)
router.route('/:id').get(userController.getOne).delete(userController.deleteUser).put(userController.updateUser)
module.exports= router