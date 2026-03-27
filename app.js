require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const errorMiddleware = require("./Middlewares/errorMiddleware");
const jwt = require("jsonwebtoken");


async function dbConnection(params) {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB connected ...");
  } catch (error) {
    console.log(error)
  }
}

dbConnection();

app.use(errorMiddleware)

const authRouters=require("./routes/authRoute")

app.use("/api/",authRouters)

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})