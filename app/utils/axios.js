
exports.main = (req, res, actions) => {

    const axios = require('axios');
    const helpers = require("./helpers");

    async function request(actions) {
        let allresponses = {};
        let res, lastresponse;

        for (let action of actions) {
        
            action = helpers.pre_query(action, allresponses);

            res = await axios(action.config);
            allresponses[action.id] = res.data.data[0];

            lastresponse = helpers.post_query(action, res, allresponses);

        }
        
        // return allresponses;
        return lastresponse;

    }

    return new Promise((resolve, reject) => {
        let mr = request(actions); 
        resolve(mr);
    });

}