module.exports = app => {
    const collections = require("../controllers/reregistrationn/index");
  
    var router = require("express").Router();
    router.post("/", (req, res) => {
        res.json({ message: "Please pass an action." });
    });
  
    // Retrieve all Collections
    router.post("/chassis", collections.chassis.main);
    router.post("/movedecision", collections.move_decision.main);
    router.post("/mrafilenumber", collections.mra_filenumber.main);
    router.post("/mrafilenumber_confirm", collections.mra_filenumber_confirm.main);
    router.post("/paydecision", collections.paydecision.main);
    router.post("/thankyou", collections.thankyou.main);
  
    app.use('/api/reregistration', router);
  };
  