
exports.main = (req, res) => {

    const request = require("../../utils/axios.js");
  
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
            placeholders:{
              pre_query: {
                excavatorchassis: {
                  queryid: 'chassisnumber',
                  column: 'TLOOK_EXCAVATOR',
                }
              },
              post_query: {
              }
            },
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_excavators?filter={ "EXCAVATOR_CHASISNUMBER": { "_eq": "{excavatorchassis}" }}', // 25
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
            }
          },
          {
            id: 'response',
            title: 'Response',
            responsekey: 'REREG_RESPONSE',
            placeholders:{
              pre_query: {
              },
              post_query: {
                chassisnumber: {
                  queryid: 'excavator',
                  column: 'EXCAVATOR_CHASISNUMBER',
                },
              }
            },
            config: {
              method: 'get',
              url: 'http://directus.asgmgh.com/items/tb_ussd_equipment_reregistration?filter={ "REREG_CODE": { "_eq": "RREG0000002" }}&fields=REREG_RESPONSE',
              headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
            }
          }
        ]
        const result = await request.main(req, res, actions);
        res.send(result);
    }; 
  
    apiCalls(req.body.ussdinput);
        
  };