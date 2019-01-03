// Dependencies
//===================================
var express = require("express");
//This will setup the express app
//===================================

var app = express();
var exphbs = require("express-handlebars");

app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");


var PORT = process.env.PORT || 8080;

//Requiring our models for syncing

var db = require("./models");

//Sets up the Excpress app to hanlde data parsing

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Static Directory
app.use(express.static("public"));


//Routes
require("./routes/order-api-routes.js")(app);
require("./routes/order-html-routes.js")(app);

db.sequelize.sync({force: true}).then(function() {
    app.listen(PORT, function() {
        console.log("App is listening on PORT " + PORT);
    })
});

