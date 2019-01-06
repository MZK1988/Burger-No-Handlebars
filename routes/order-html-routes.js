var db = require("../models")

var path = require("path")

module.exports = function (app) {
    app.get("/order", function (req, res) {
        db.Order.findAll({}).then(function (dbOrder) {
            //can likely filter out the devoured orders here
            var dbStuff = {
                dbOrder,
                msg: "This is the Order!"
            }
            console.log(dbStuff);
            res.render("index", dbStuff)
        })
        // Handlebars requires an object to be sent to the dog handlebars file.
    })


    app.get("/order/:id", function (req, res) {
        db.Order.findAll({}).then(function (dbOrder) {
            var dbStuff = {
                dbOrder,
                msg: "this is a burger"
            }

            console.log(dbStuff);
            res.render("order", dbStuff
            );
        });
    });



}