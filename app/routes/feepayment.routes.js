module.exports = app => {
  const collections = require("../controllers/collection.controller.js");

  var router = require("express").Router();

  // Retrieve all Collections
  router.get("/", collections.findAll);

  app.use('/api/collections', router);
};
