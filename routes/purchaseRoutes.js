const express= require('express')
const router= express.Router()
const userController= require('../controller/userController')
const purchaseController= require('../controller/purchaseController')
router.post('/:productId', userController.protect, purchaseController.purchase)


module.exports= router