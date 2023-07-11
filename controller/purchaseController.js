const User= require("./../models/userModel")
const Product= require('./../models/productModel')

exports.purchase= async(req, res)=>{
    try{
        console.log(req.params.productId)
        const product= await Product.findById(req.params.productId)

        if(!product) throw new Error("There is not product with given id")

        const user= await User.findById(req.user.id)

       if(user.products.includes(req.params.productId)) return res.status(400).json({
        error: "This product is already exist"
       })
        user.products.push(req.params.productId)

        const result = await user.save()

        res.status(200).json({
            status: 'success',
            result
        })

    }catch(err){
        res.status(404).json({
            error: err.message
        })
    }
}