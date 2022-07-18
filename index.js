const express = require("express");
let API = require("./api-route");
const cors = require("cors");
let User = require("./controllers/UserController");
let Product = require("./controllers/ProductController");
let Role = require("./controllers/RoleController");

const app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
mongoose.connect("mongodb://localhost/ACL", { useNewUrlParser: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");
app.use(bodyParser.json());
app.use(cors());
var port = process.env.PORT || 4000;
app.use("/product", Product);
app.use("/master", Role);
app.use("/user", User);

app.listen(port, function () {
  console.log("Server Started Now!!");
});
