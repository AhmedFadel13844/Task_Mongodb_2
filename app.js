const express= require('express')
const app= express()
const productRoutes= require('./routes/productRoutes')
const userRoutes= require('./routes/userRoutes')
const purchaseRoutes= require('./routes/purchaseRoutes')


app.use(express.json())



app.use('/api/v1/products', productRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/purchase', purchaseRoutes)

module.exports = app