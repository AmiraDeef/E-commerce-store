require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const path = require('path');
const morgan=require('morgan')
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const errorMiddleware = require("./Middlewares/errorMiddleware");
const jwt = require("jsonwebtoken");
const cors = require('cors');
app.use(cors())

async function dbConnection(params) {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB connected ...");
  } catch (error) {
    console.log(error)
  }
}

dbConnection();
app.use(morgan('dev'));


const authRouters=require("./routes/authRoute")
const catRoute=require("./routes/categoryRoute")
const proRoute=require("./routes/productRoute")


app.use("/api/",authRouters)
app.use("/api/categories",catRoute)
app.use("/api/products",proRoute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(errorMiddleware)
app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})