const express= require('express')
const router= express.Router()

const productController= require('./../controller/productController')
const userController= require('./../controller/userController')
router.use(userController.protect)
router.get('/',productController.getAllProducts)
router.post('/', productController.addProduct)
router.get('/:id', productController.getOne)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)



module.exports= router