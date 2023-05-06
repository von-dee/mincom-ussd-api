
// Check Menu
const ckm_menu = require("./menu");

// Concession Status Check
const csc_filenumber = require("./concessionstatuscheck/1_filenumber");
const csc_filenumberconfirm = require("./concessionstatuscheck/2_filenumberconfirm");
const csc_message = require("./concessionstatuscheck/3_message");

// Equipment Status Check
const esc_chassisnumber = require("./equipmentstatuscheck/1_chassisnumber");
const esc_chassisnumberconfirm = require("./equipmentstatuscheck/2_chassisnumberconfirm");
const esc_message = require("./equipmentstatuscheck/3_message");

// Tracker Status Check
const tsc_chassis = require("./trackerstatuscheck/1_chassis");
const tsc_chassisconfirm = require("./trackerstatuscheck/2_chassisconfirm");
const tsc_proceedbeep = require("./trackerstatuscheck/3_proceedbeep");
const tsc_thankyou = require("./trackerstatuscheck/4_thankyou");

module.exports = { ckm_menu, csc_filenumber, csc_filenumberconfirm, csc_message, esc_chassisnumber, esc_chassisnumberconfirm, esc_message, tsc_chassis, tsc_chassisconfirm, tsc_proceedbeep, tsc_thankyou }