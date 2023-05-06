
const chassis = require("./1_chassis");
const move_decision = require("./2_move_decision");
const mra_filenumber = require("./3_mra_filenumber");
const mra_filenumber_confirm = require("./4_mra_filenumber_confirm");
const paydecision = require("./5_paydecision");
const thankyou = require("./6_thankyou");

module.exports = { chassis, move_decision, mra_filenumber, mra_filenumber_confirm, paydecision, thankyou }