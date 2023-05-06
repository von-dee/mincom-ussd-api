module.exports = app => {
  const collections = require("../controllers/reconnection/index");

  var router = require("express").Router();
  router.post("/", (req, res) => {
    res.json({ message: "Please pass an action." });
  });
  
  // Retrieve all Collections
  router.post("/chassis", collections.chassis.main);
  router.post("/paydecision", collections.paydecision.main);
  router.post("/thankyou", collections.thankyou.main);
  

  app.use('/api/reconnection', router);
};
