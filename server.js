const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;
app.use(cors());
app.use(bodyParser.json());
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection Success!");
});

const supplierRouter= require("./routes/supplier");
app.use("/supplier",supplierRouter);

const userRouter= require("./routes/user");
app.use("/user",userRouter);


//const feedbackRouter= require("./routes/feedback");
//app.use("/feedback",feedbackRouter);

const employeeRouter= require("./routes/employee");
app.use("/employee",employeeRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
