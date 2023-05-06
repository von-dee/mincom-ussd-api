
exports.main = (req, res) => {

    const request = require("../../../utils/axios.js");
  
    async function apiCalls(ussdinput) {
        const actions = [
          {
            id: 'filenumber',
            title: 'File Number',
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_tracker_lookup?filter={ "TLOOK_CONCESSION": { "_eq": "'+
              ussdinput+'" }}',
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
            }
          },
          {
            
            id: 'concession',
            title: 'Concession',
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_concessions?filter={ "CONCESSION_APLCODE": { "_eq": "'+
              ussdinput+'" }}',
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
            }
          },
          {
            id: 'response',
            title: 'Response',
            responsekey: 'CHECK_RESPONSE',
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_ussd_taskforceschecks?filter={ "CHECK_CODE": { "_eq": "CHECK000005" }}',
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
            }
          }
        ]
        const result = await request.main(req, res, actions);
        res.send(result);
    }; 
  
    apiCalls(req.body.ussdinput);
        
  };