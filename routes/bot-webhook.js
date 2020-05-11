var express = require('express');
var router = express.Router();
var botService = require("../services/bot-service")

// Adds support for GET requests to our webhook
router.get('/', (req, res) => {

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Verify
    botService.verifyWebhook(mode, token, challenge)
        .then(msg => {
            res.status(msg.status).send(msg.challenge);
        })
        .catch(err => {
            res.status(msg.status)
        })

});
// Creates the endpoint for our webhook 
router.post('/', (req, res) => {

    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                botService.handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                botService.handlePostback(sender_psid, webhook_event.postback);
            }
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});

module.exports = router;
