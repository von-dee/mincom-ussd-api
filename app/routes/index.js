module.exports = app => {

    require("./menu.routes.js")(app);
    require("./reconnection.routes")(app);
    require("./reregistration.routes")(app);
    require("./feepayment.routes")(app);
    require("./taskforcecheck.routes")(app);

};