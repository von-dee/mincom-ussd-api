module.exports = app => {

    require("./menu.routes.js")(app);
    require("./reconnection.routes")(app);

};