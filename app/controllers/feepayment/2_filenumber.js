
exports.main = (req, res) => {

    const request = require("../../utils/axios.js");
  
    async function apiCalls(ussdinput) {
        const actions = [
          {
            id: 'response',
            title: 'Response',
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_ussd_feepayments?filter={ "FEE_CODE": { "_eq": "FEE0000002" }}',
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
            }
          }
        ]
        const result = await request.main(req, res, actions);
        res.send(result);
    }; 
  
    apiCalls(req.body.ussdinput);
        
  };