
exports.main = (req, res) => {

    const request = require("../../utils/axios.js");
  
    async function apiCalls() {
        const actions = [
          {
            id: 'response',
            title: 'Response',
            responsekey: 'MENU_RESPONSE',
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_ussd_menu?filter={ "MENU_CODE": { "_eq": "MENU000002" }}',
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
            }
          }
        ]
        const result = await request.main(req, res, actions);
        res.send(result);
    }; 
  
    apiCalls();
        
  };