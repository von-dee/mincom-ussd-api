module.exports = app => {
  const collections = require("../controllers/menu/index.js");

  var router = require("express").Router();

  // Retrieve all Collections
  router.get("/", collections.main);

  app.use('/api/menu', router);
};
