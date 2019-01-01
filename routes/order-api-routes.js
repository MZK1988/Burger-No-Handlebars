var db = require("../models");

module.exports = function(app) {
    //these queries the database/datastructure/sequelizeORM for all of the orders 
    app.get("/api/orders/", function(req, res) {
        db.Order.findAll({}).then(function(dbOrder) {
            res.json(dbOrder);
        })
    })


    app.post("/api/new", function(req, res) {
        console.log(req.body);
        db.Order.create({
            body: req.body.body
        }).then(function(resutls) {
            res.end();
        })

    })

    //update the boolean value of true or false if devoured
    app.put("/api/orders", function(req, res) {
        console.log(req.body);
        db.Order.update({
            body: req.body.body,
            devour: req.body.devour
        }, {
            where: {
              id: req.body.id
            }
          })
          .then(function(dbOrder) {
            res.json(dbOrder);
          });
      });


}