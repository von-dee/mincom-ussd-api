var express = require('express');
const cache = require('memory-cache');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => res.status(200).send('GMRTCR Rocks!!'));

app.post('/ussd', ((req, res) => {
    const {
        sessionID,
        userID,
        newSession,
        msisdn,
        userData,
        network,
    } = req.body;

    if (newSession) {
        // Menu Page
        const message = "Menu" +
            "\n1. Equipment Reconnection" +
            "\n2. Equipment Reregistration" +
            "\n3. Fee Payment" +
            "\n4. Task-force Checks";
        const continueSession = true;

        // Keep track of the USSD state of the user and their session
        const currentState = {
            sessionID,
            msisdn,
            userData,
            network,
            newSession,
            message,
            level: 1,
            page: 1,
        };

        let userResponseTracker = cache.get(sessionID);

        !userResponseTracker
            ? userResponseTracker = [{ ...currentState }]
            : userResponseTracker.push({ ...currentState });

        cache.put(sessionID, userResponseTracker);

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({
            userID,
            sessionID,
            message,
            continueSession,
            msisdn
        });
    }

    const userResponseTracker = cache.get(sessionID);

    if (!userResponseTracker) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({
            userID,
            sessionID,
            message: 'Error! Please dial code again!',
            continueSession: false,
            msisdn
        });
    }

    const lastResponse = userResponseTracker[userResponseTracker.length - 1];

    let message = "Bad Option";
    let continueSession = false;

    if (lastResponse.level === 1) {
        // First Pages of all Menu Option's Sections
        if (userData === '1') {
            message = "Please Enter Chassis Number of vehicle.";
            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 10,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        } else if (userData === '2') {
            message = "Please Enter Chassis Number of vehicle.";

            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 20,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        } else if (userData === '3') {
            message = "Select the Bill or Fee you want to pay:" + 
                "\n1. Monitoring Fee" +
                "\n2. Tracker Cost Payment" +
                "\n\n*. Go Back";
                

            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 30,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        } else if (userData === '4') {
            message = "Menu" +
                "\n1. Equipment Status" +
                "\n2. Concession Status" +
                "\n2. Tracker Beep Check" +
                "\n\n*. Go Back";

            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 40,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }
    } else if (lastResponse.level >= 10 && lastResponse.level <= 19) {
        // Equipment Reconnection
        if (lastResponse.level === 10 ){
            message = "Vehicle 6873224 is out of its concession. Do you want to:"+
            "\n1. Pay to Reconnect" + 
            "\n*. Cancel ";

            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 11,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }else if (lastResponse.level === 11 ){
            message = "Thank you for going through the reconnection process. You will receive a prompt to proceed with payment.";

            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 12,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }else if (lastResponse.level === 12 ){
            if (!isNaN(userData) && parseFloat(userData) > 0) {
                const uniqueRef = `${Date.now() + (Math.random() * 100)}`;
                const paymentRequest = {
                    account_number: msisdn,
                    merchant_reference: uniqueRef,
                    channel: "mobile-money",
                    provider: network.toLowerCase(),
                    transaction_type: "debit",
                    amount: userData,
                    purpose: "voting payment",
                    service_name: "arkesel voting",
                    currency: "GHS",
                };
                const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxx=';
                const url = 'https://payment.arkesel.com/api/v1/payment/charge/initiate';
    
                axios({
                    method: 'post',
                    url,
                    data: { ...paymentRequest },
                    headers: {
                        'api-key': apiKey,
                    }
                }).then(res => res.data).then(data => {
                    console.log({ data }, 'Initiate payment');
                    // Save into DB
                    // If it was successful then send message
                    message = `Authorize payment of GHS ${userData} from your account to MINCOM for Reconnection of Tracked Equipment. Dial *170# to visit approvals if one doesn't pop up! \nEnter MM PIN to continue`;
                    continueSession = false;
                });
    
                message = `Authorize payment of GHS ${userData} from your account to MINCOM for Reconnection of Tracked Equipment. Dial *170# to visit approvals if one doesn't pop up! \nEnter MM PIN to continue`;
                continueSession = false;
    
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).json({
                    userID,
                    sessionID,
                    message,
                    continueSession,
                    msisdn
                });
    
            } else {
                message = "You entered an invalid amount: ";
                continueSession = true;
    
                const currentState = {
                    sessionID,
                    userID,
                    level: 3,
                    msisdn,
                    message,
                    userData,
                    network,
                    newSession,
                    page: 1,
                };
    
                userResponseTracker.push({ ...currentState });
                cache.put(sessionID, userResponseTracker);
            }
        }else if (lastResponse.level === 13 ){
            message = "Do you want to approve the transaction"+
            "\n1. Yes"
            "\n2. No";
            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 15,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }
    } else if (lastResponse.level >= 20 && lastResponse.level <= 29) {
        // Equipment Reregistration
        if (lastResponse.level === 20 ){
            message = "Do you want to move vehicle 6873224 is out of its concession?"+
            "\n1. Yes" +
            "\n2. No";

            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 21,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }else if (lastResponse.level === 21 ){
            message = "Enter the ID / File number of the concession you want to move the vehicle to:";

            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 22,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }else if (lastResponse.level === 22 ){
            message = "Please Confirm the ID / File Number";

            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 23,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }else if (lastResponse.level === 23 ){
            message = "Proceed with payment to move Vehicle 6873224 from Mohammed Brothers to Oteng Mining?" +
            "\n1. Yes" +
            "\n2. No";
            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 23,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }else if (lastResponse.level === 23 ){
            message = "Thank you for going through the reregistration process. You will receive a prompt to proceed with payment.";
            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 24,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }else if (lastResponse.level === 24 ){
            if (!isNaN(userData) && parseFloat(userData) > 0) {
                const uniqueRef = `${Date.now() + (Math.random() * 100)}`;
                const paymentRequest = {
                    account_number: msisdn,
                    merchant_reference: uniqueRef,
                    channel: "mobile-money",
                    provider: network.toLowerCase(),
                    transaction_type: "debit",
                    amount: userData,
                    purpose: "voting payment",
                    service_name: "arkesel voting",
                    currency: "GHS",
                };
                const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxx=';
                const url = 'https://payment.arkesel.com/api/v1/payment/charge/initiate';
    
                axios({
                    method: 'post',
                    url,
                    data: { ...paymentRequest },
                    headers: {
                        'api-key': apiKey,
                    }
                }).then(res => res.data).then(data => {
                    console.log({ data }, 'Initiate payment');
                    // Save into DB
                    // If it was successful then send message
                    message = `Authorize payment of GHS ${userData} from your account to MINCOM for Reregistration of Tracked Equipment. Dial *170# to visit approvals if one doesn't pop up! \nEnter MM PIN to continue`;
                    continueSession = false;
                });
    
                message = `Authorize payment of GHS ${userData} from your account to MINCOM for Reregistration of Tracked Equipment. Dial *170# to visit approvals if one doesn't pop up! \nEnter MM PIN to continue`;
                continueSession = false;
    
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).json({
                    userID,
                    sessionID,
                    message,
                    continueSession,
                    msisdn
                });
    
            } else {
                message = "You entered an invalid amount: ";
                continueSession = true;
    
                const currentState = {
                    sessionID,
                    userID,
                    level: 3,
                    msisdn,
                    message,
                    userData,
                    network,
                    newSession,
                    page: 1,
                };
    
                userResponseTracker.push({ ...currentState });
                cache.put(sessionID, userResponseTracker);
            }
        }else if (lastResponse.level === 25 ){
            message = "Do you want to approve the transaction"+
            "\n1. Yes"
            "\n2. No";
            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 15,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }
    } else if (lastResponse.level >= 30 && lastResponse.level <= 39) {
        // Fee Payment
        if (lastResponse.level === 30 ){
            message = "Enter File Number of your concession";

            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 31,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }else if (lastResponse.level === 31 ){
            message = "Your Concession Oteng Mining has an outstanding fee or bill of 4,050 to pay. Please enter the amount you want to pay below.";

            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 32,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }else if (lastResponse.level === 32 ){
            message = "Do you want to proceed with payment of 3000"+
            "\n1. Yes" +
            "\n2. No";
            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 33,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }else if (lastResponse.level === 33 ){
            message = "Thank you for going through the bill payment process. You will receive a prompt to proceed with payment.";
            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 34,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }else if (lastResponse.level === 34 ){
            if (!isNaN(userData) && parseFloat(userData) > 0) {
                const uniqueRef = `${Date.now() + (Math.random() * 100)}`;
                const paymentRequest = {
                    account_number: msisdn,
                    merchant_reference: uniqueRef,
                    channel: "mobile-money",
                    provider: network.toLowerCase(),
                    transaction_type: "debit",
                    amount: userData,
                    purpose: "voting payment",
                    service_name: "arkesel voting",
                    currency: "GHS",
                };
                const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxx=';
                const url = 'https://payment.arkesel.com/api/v1/payment/charge/initiate';
    
                axios({
                    method: 'post',
                    url,
                    data: { ...paymentRequest },
                    headers: {
                        'api-key': apiKey,
                    }
                }).then(res => res.data).then(data => {
                    console.log({ data }, 'Initiate payment');
                    // Save into DB
                    // If it was successful then send message
                    message = `Authorize payment of GHS ${userData} from your account to MINCOM for Reconnection of Payment of Bill. Dial *170# to visit approvals if one doesn't pop up! \nEnter MM PIN to continue`;
                    continueSession = false;
                });
    
                message = `Authorize payment of GHS ${userData} from your account to MINCOM for Reconnection of Payment of Bill. Dial *170# to visit approvals if one doesn't pop up! \nEnter MM PIN to continue`;
                continueSession = false;
    
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).json({
                    userID,
                    sessionID,
                    message,
                    continueSession,
                    msisdn
                });
    
            } else {
                message = "You entered an invalid amount: ";
                continueSession = true;
    
                const currentState = {
                    sessionID,
                    userID,
                    level: 3,
                    msisdn,
                    message,
                    userData,
                    network,
                    newSession,
                    page: 1,
                };
    
                userResponseTracker.push({ ...currentState });
                cache.put(sessionID, userResponseTracker);
            }
        }else if (lastResponse.level === 35 ){
            message = "Do you want to approve the transaction"+
            "\n1. Yes"
            "\n2. No";
            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 15,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }
    } else if (lastResponse.level >= 40 && lastResponse.level <= 49) {
        // Task Force Checks
        if (lastResponse.level === 40 ){
            message = "Menu" +
            "\n1. Equipment Status" +
            "\n2. Concession Status" +
            "\n3. Tracker Beep Check";

            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 400,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }else if (lastResponse.level === 400 && userData === '1'){
            message = "Enter Equipment's Chassis number";

            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 410,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }else if (lastResponse.level === 400 && userData === '2'){
            message = "Enter concession's file number";

            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 420,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }else if (lastResponse.level === 400 && userData === '3'){
            message = "Enter Equipment's Chassis number";

            continueSession = true;

            const currentState = {
                sessionID,
                userID,
                level: 430,
                msisdn,
                message,
                userData,
                network,
                newSession,
                page: 1,
            };

            userResponseTracker.push({ ...currentState });
            cache.put(sessionID, userResponseTracker);
        }else if (lastResponse.level >= 410 && lastResponse.level <= 419 ){
            // Equipment Status
            if (lastResponse.level === 410 ){
                message = "Confirm Equipment's Chassis number";
    
                continueSession = true;
    
                const currentState = {
                    sessionID,
                    userID,
                    level: 11,
                    msisdn,
                    message,
                    userData,
                    network,
                    newSession,
                    page: 1,
                };
    
                userResponseTracker.push({ ...currentState });
                cache.put(sessionID, userResponseTracker);
            }else if (lastResponse.level === 411 ){
                message = "Equipment with Chassis Number SN174GD87DG8D7843 belongs to Mr Koffie and is on FN7863 Oteng Mining.";
                continueSession = true;
    
                const currentState = {
                    sessionID,
                    userID,
                    level: 3,
                    msisdn,
                    message,
                    userData,
                    network,
                    newSession,
                    page: 1,
                };
    
                userResponseTracker.push({ ...currentState });
                cache.put(sessionID, userResponseTracker);
            }
        }else if (lastResponse.level >= 420 && lastResponse.level <= 429 ){
            // Concession Status
            if (lastResponse.level === 420 ){
                message = "Confirm concession's file number.";
    
                continueSession = true;
    
                const currentState = {
                    sessionID,
                    userID,
                    level: 11,
                    msisdn,
                    message,
                    userData,
                    network,
                    newSession,
                    page: 1,
                };
    
                userResponseTracker.push({ ...currentState });
                cache.put(sessionID, userResponseTracker);
            }else if (lastResponse.level === 421 ){
                message = "FN234234 is a Licensed concession  with name Oteng Mining in Damang.";
    
                continueSession = true;
    
                const currentState = {
                    sessionID,
                    userID,
                    level: 12,
                    msisdn,
                    message,
                    userData,
                    network,
                    newSession,
                    page: 1,
                };
    
                userResponseTracker.push({ ...currentState });
                cache.put(sessionID, userResponseTracker);
            }
        }else if (lastResponse.level >= 430 && lastResponse.level <= 439 ){
            // Tracker Beep Check
            if (lastResponse.level === 430 ){
                message = "Confirm Equipment Chassis number";
    
                continueSession = true;
    
                const currentState = {
                    sessionID,
                    userID,
                    level: 431,
                    msisdn,
                    message,
                    userData,
                    network,
                    newSession,
                    page: 1,
                };
    
                userResponseTracker.push({ ...currentState });
                cache.put(sessionID, userResponseTracker);
            }else if (lastResponse.level === 431 ){
                message = "Proceed to send a beep request?" +
                "\n1. Yes" +
                "\n2. No";
    
                continueSession = false;
    
                const currentState = {
                    sessionID,
                    userID,
                    level: 12,
                    msisdn,
                    message,
                    userData,
                    network,
                    newSession,
                    page: 1,
                };
    
                userResponseTracker.push({ ...currentState });
                cache.put(sessionID, userResponseTracker);
            }
        }
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
        userID,
        sessionID,
        message,
        continueSession,
        msisdn
    });
}));

// Callback URL for payment
app.get('/payments/arkesel/callback', ((req, res) => {
    console.log({ query: res.query }, 'Callback for Arkesel payment');
    // Verify the payment...

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
        status: 'success',
        message: 'arkesel payment callback called'
    });
}));

// Verify payment
app.get('/payments/verify', ((req, res) => {
    const apiKey = 'XXXXXXXXXXXXXXXXXXXXXXX=';
    const transRef = 'T634E3e8cac8175';
    const url = `https://payment.arkesel.com/api/v1/verify/transaction/${transRef}`;

    axios({
        method: 'get',
        url,
        headers: {
            'api-key': apiKey,
        }
    }).then(res => res.data).then(data => {
        console.log({ data }, 'Verify payment');
        // Update payment status in DB
    });
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
        status: 'success',
        message: 'payment verification called'
    });
}));

app.listen(8000, function () {
    console.log('Arkesel USSD app listening on 8000!');
});