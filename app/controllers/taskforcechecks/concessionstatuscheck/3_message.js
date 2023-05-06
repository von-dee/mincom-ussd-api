
exports.main = (req, res) => {

    const request = require("../../../utils/axios.js");
  
    async function apiCalls() {
        const actions = [
          {
            title: 'Response',
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_ussd_taskforceschecks?filter={ "CHECK_CODE": { "_eq": "CHECK000006" }}',
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
            }
          }
        ]
        const result = await request.main(req, res, actions);
        res.send(result);
    }; 
  
    apiCalls();
        
  };