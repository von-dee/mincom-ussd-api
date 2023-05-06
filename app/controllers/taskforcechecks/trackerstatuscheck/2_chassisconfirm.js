
exports.main = (req, res) => {

    const request = require("../../../utils/axios.js");
  
    async function apiCalls(ussdinput) {
        const actions = [
          {
            id: 'chassisnumber',
            title: 'Chassis Number',
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_tracker_lookup?filter={ "TLOOK_EXCAVATOR": { "_eq": "'+
              ussdinput+'" }}',
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
            }
          },
          {
            id: 'excavator',
            title: 'Excavator',
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_excavators?filter={ "EXCAVATOR_CHASISNUMBER": { "_eq": "'+
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
              url: 'http://directus.asgmgh.com/items/tb_ussd_taskforceschecks?filter={ "CHECK_CODE": { "_eq": "CHECK000008" }}',
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
            }
          }
        ]
        const result = await request.main(req, res, actions);
        res.send(result);
    }; 
  
    apiCalls(req.body.ussdinput);
        
  };