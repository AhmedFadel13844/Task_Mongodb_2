const mongoose= require('mongoose')

const dotenv= require('dotenv')
dotenv.config({path: './config.env'})
const app= require("./app");

mongoose.connect('mongodb://localhost:27017/E-commerce',
 {
     useNewUrlParser: true,
     useUnifiedTopology: true})
  .then(() => console.log('Connected to database...'))
  .catch(error => console.error('Error connecting to MongoDB', error));



// console.log(process.env)
const port= process.env.PORT || 5000
app.listen(port, ()=> console.log(`Listinning on port ${port}...`))