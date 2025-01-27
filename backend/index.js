const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/route.js");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect(process.env.MONGOOSEURL);
  console.log("database connected successfully !");
}

connect();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/v1",router)

const port = process.env.PORT || 3000;

app.listen(port,()=>{
  console.log(`Server running on port -> ${port}`);
})