const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
require("dotenv").config();

//import routes
const authRoutes = require("./routes/auth.js");
const leaveRoutes = require("./routes/leave");

var app = express();

//db connection
mongoose.connect(process.env.database).then(() => console.log("DB Connected"));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes midddleware
app.use("/api", authRoutes);
app.use("/api", leaveRoutes);
app.get("/", function (request, response) {
  response.send("Hello World!");
});

// const port = process.env.PORT || 8000;
const port = 8000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
