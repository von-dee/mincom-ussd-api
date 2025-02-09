
exports.main = (req, res) => {

    const request = require("../../utils/axios.js");

    async function apiCalls() {
        const actions = [
          {
            title: 'Response',
            responsekey: 'EQUIPREC_RESPONSE',
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