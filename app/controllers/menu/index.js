
exports.main = (req, res) => {

    const request = require("../../utils/axios.js");

    async function apiCalls() {
        const actions = [
            {
              title: 'Chassis Number',
              config: {
                method: 'get',
                url: 'http://directus.asgmgh.com/items/tb_ussd_menu?filter={"MENU_CODE":{"_eq":"MENU000001" }}&fields=MENU_RESPONSE',
                headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
              }
            }
        ]
        const result = await request.main(req, res, actions);
        res.send(result);
    }; 

    apiCalls();
        
};