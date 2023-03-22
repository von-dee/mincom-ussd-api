
exports.main = (req, res, actions) => {

    const axios = require('axios');

    async function request(actions) {
        let allresponses = [];
        for (const action of actions) {
            let res = await axios(action.config)
            allresponses.push(res.data.data[0]);
        }
        return allresponses;
    }

    return new Promise((resolve, reject) => {
        let mr = request(actions); 
        resolve(mr);
    });

}