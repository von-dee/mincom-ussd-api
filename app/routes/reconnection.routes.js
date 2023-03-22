module.exports = app => {
  const collections = require("../controllers/reconnection/index");

  var router = require("express").Router();

  // Retrieve all Collections
  router.get("/chassis", collections.chassis.main);
  router.get("/paydecision", collections.paydecision.main);
  router.get("/thankyou", collections.thankyou.main);
  

  app.use('/api/reconnection', router);
};
