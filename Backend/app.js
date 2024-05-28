require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/book-routes")

const app = express();

// Middlewares
app.use(express.json())
app.use("/books",router) //localhost:5000/books


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to database"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));


