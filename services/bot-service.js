request = require('request')

var botService = {
    verifyWebhook,
    handleMessage,
    handlePostback,
    callSendAPI
}

function verifyWebhook(mode, token, challenge) {
    return new Promise((resolve, reject) => {
        // Your verify token. Should be a random string.
        let VERIFY_TOKEN = process.env.VERIFY_TOKEN

        // Checks if a token and mode is in the query string of the request
        if (mode && token) {

            // Checks the mode and token sent is correct
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {

                // Responds with the challenge token from the request
                console.log('WEBHOOK_VERIFIED');

                resolve({
                    status: 200,
                    send: challenge,
                })
            } else {
                // Responds with '403 Forbidden' if verify tokens do not match
                reject({
                    status: 403
                })
            }
        }
    })
}
// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response;

    // Checks if the message contains text
    if (received_message.text) {

        // Creates the payload for a basic text message, which
        // will be added to the body of our request to the Send API
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
        }

    } else if (received_message.attachments) {

        // Gets the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
            "text": `Your attachment url: "${attachment_url}"`
        }
    }

    // Sends the response message
    callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = { "text": "Thanks!" }
    } else if (payload === 'no') {
        response = { "text": "Oops, try sending another image." }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

module.exports = botService;