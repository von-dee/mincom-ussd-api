
exports.main = (req, res) => {

    const request = require("../../utils/axios.js");
    
    const helpers = require("../../utils/helpers");

                
  
    async function apiCalls(ussdinput) {

      let checkcancel = helpers.checkcancel(ussdinput);
      if(checkcancel !== false){
        res.send(checkcancel);
        return;
      }

      const actions = [
        // {
        //   title: 'Chassis Number',
        //   config: {
        //     method: 'get',
        //     url: 'http://directus.asgmgh.com/items/tb_ussd_menu?filter={"MENU_CODE":{"_eq":"MENU000001" }}',
        //     headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
        //   }
        // },
        {
          title: 'Response',
          responsekey: 'EQUIPREC_RESPONSE',
          config: {
            method: 'get',
            url: 'http://directus.asgmgh.com/items/tb_ussd_equipment_reconnection?filter={ "EQUIPREC_CODE": { "_eq": "EQUI0000003" }}&fields=EQUIPREC_RESPONSE',
            headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
          }
        }
      ]
      const result = await request.main(req, res, actions);
      res.send(result);
    }; 
  
    apiCalls(req.body.ussdinput);
        
  };