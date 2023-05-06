
exports.main = (req, res) => {

    const request = require("../../utils/axios.js");
  
    async function apiCalls(ussdinput) {
        const actions = [
          {
            id: 'response',
            title: 'Response',
            responsekey: 'FEE_RESPONSE',
            placeholders:{
              pre_query: {
              },
              post_query: {
                amount: {
                  queryid: 'input',
                  column: ussdinput,
                },
              }
            },
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_ussd_feepayments?filter={ "FEE_CODE": { "_eq": "FEE0000004" }}',
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf', 'Content-Type': 'application/json' }
            }
          }
        ]
        const result = await request.main(req, res, actions);
        res.send(result);
    }; 
  
    apiCalls(req.body.ussdinput);
        
  };