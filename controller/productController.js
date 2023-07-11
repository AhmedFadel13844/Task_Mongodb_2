const Product= require('./../models/productModel')


exports.getAllProducts= async(req, res)=>{

    const products= await Product.find()
    console.log(products)
    if(!products[0]) return res.status(404).json({
        error: "There is no products"
    })

    res.status(200).json({
        status: "success",
        products
    })
   
}

exports.getOne= async(req, res)=>{
    try{
        const product= await Product.findById(req.params.id)

        if(!product) throw new Error('There is no product with given id')

        res.status(200).json({
            status: "success",
            product
        })
    }catch(err){
        res.status(401).json({
            error: err.message
        })
    }

}

exports.addProduct= async(req, res)=>{
    const newProduct= await Product.create(req.body)

    res.status(201).json({
        status: "success",
        product: newProduct
    })
   
}

exports.updateProduct=async (req, res)=>{

    try{
        const product= await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: "success",
            product
        })
    }catch(err){
        res.status(404).json({
            status: "Failed",
            message: err.message
        })
    }
}

exports.deleteProduct= async(req, res)=>{
    try{
        const product= await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            data:{
                product
            }
        })
    }catch(err){
        res.status(404).json({
            status: "Failed",
            message: err.message
        })
    }
}