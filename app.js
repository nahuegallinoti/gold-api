require("dotenv").config();
require("./config/database").connect();
const morgan = require("morgan");


const userRoute = require("./routes/user");
const express = require("express");

const app = express();

app.use(morgan("dev"));
app.use(express.json());


app.use('/user', userRoute);

module.exports = app;