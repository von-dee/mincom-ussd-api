
exports.main = (req, res) => {

    const request = require("../../utils/axios.js");
  
    async function apiCalls() {
        const actions = [
          {
            title: 'Chassis Number',
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_ussd_menu?filter={"MENU_CODE":{"_eq":"MENU000001" }}',
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
            }
          },
          {
            title: 'Excavator',
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_excavators?filter={ "EXCAVATOR_ID": { "_eq": "25" }}',
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
            }
          },
          {
            title: 'Response',
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_ussd_equipment_reconnection?filter={ "EQUIPREC_CODE": { "_eq": "EQUI0000001" }}&fields=EQUIPREC_RESPONSE',
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
            }
          }
        ]
        const result = await request.main(req, res, actions);
        res.send(result);
    }; 
  
    apiCalls();
        
  };