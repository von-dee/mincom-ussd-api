# Node.js Rest APIs for MINCOM USSD APPLICATION

For instruction, please visit:
https://github.com/bezkoder/nodejs-express-sequelize-mysql

## Project setup
```
npm install
```

### Run
```
node server.js
```



<!-- Hold To Dynamic Request -->

{
    title: 'Excavator',
    placeholders:{
        excavator_id: '25',
        EXCAVATOR_ID: 'EXCAVATOR_ID'
    },
    config: {
        method: 'get',
        url: 'http://directus.asgmgh.com/items/tb_excavators?filter={ "EXCAVATOR_CHASISNUMBER": { "_eq": "'+
        ussdinput+'" }}',
        headers: { 'Authorization': 'Bearer c97WMFxvp17HdRFEOkf0ZII54QZudoQf' }
    }
},
