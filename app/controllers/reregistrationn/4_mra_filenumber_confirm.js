
exports.main = (req, res) => {

    const request = require("../../utils/axios.js");
  
    async function apiCalls(ussdinput) {
        const actions = [
          {
            id: 'mrafilenumber',
            title: 'MRA File Number',
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_tracker_lookup?filter={ "TLOOK_CONCESSION": { "_eq": "'+
              ussdinput+'" }}',
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
            }
          },
          {
            id: 'response',
            title: 'Response',
            responsekey: 'REREG_RESPONSE',
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_ussd_equipment_reregistration?filter={ "REREG_CODE": { "_eq": "RREG0000004" }}',
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
            }
          }
        ]
        const result = await request.main(req, res, actions);
        res.send(result);
    }; 
  
    apiCalls(req.body.ussdinput);
        
  };