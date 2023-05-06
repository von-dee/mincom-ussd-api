module.exports = app => {
  const collections = require("../controllers/feepayment/index");

  var router = require("express").Router();
  router.post("/", (req, res) => {
      res.json({ message: "Please pass an action." });
  });

  // Retrieve all Collections
  router.post("/selectbill", collections.selectbill.main);
  router.post("/filenumber", collections.filenumber.main);
  router.post("/enteramount", collections.enteramount.main);
  router.post("/paydecision", collections.paydecision.main);
  router.post("/thankyou", collections.thankyou.main);
  

  app.use('/api/feepayment', router);
};
