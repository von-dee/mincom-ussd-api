module.exports = app => {
  const collections = require("../controllers/taskforcechecks/index");

  var router = require("express").Router();

  // Retrieve all Collections
  router.post("/ckm_menu", collections.ckm_menu.main);

  router.post("/csc_filenumber", collections.csc_filenumber.main);
  router.post("/csc_filenumberconfirm", collections.csc_filenumberconfirm.main);
  router.post("/csc_message", collections.csc_message.main);

  router.post("/esc_chassisnumber", collections.esc_chassisnumber.main);
  router.post("/esc_chassisnumberconfirm", collections.esc_chassisnumberconfirm.main);
  router.post("/esc_message", collections.esc_message.main);
  
  router.post("/tsc_chassis", collections.tsc_chassis.main);
  router.post("/tsc_chassisconfirm", collections.tsc_chassisconfirm.main);
  router.post("/tsc_proceedbeep", collections.tsc_proceedbeep.main);
  router.post("/tsc_thankyou", collections.tsc_thankyou.main);
  

  app.use('/api/taskforcecheck', router);
};
