'use strict';
const axios = require('axios');
const twilio = require("twilio");

module.exports.handler = async (event) => {
const {
    NASA_API_KEY,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER,
    MY_PHONE_NUMBER,
} = process.env;

const { data: imageData } = await axios.get (
    `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
);

const body = `
----
--${imageData.date}--
----
Good Morning JB...
Here is today's cool picture of the cosmos!
----
${imageData.url}
----
"${imageData.title}"
----
${imageData.explanation}
`;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

await client.messages.create({
    body,
    from: TWILIO_PHONE_NUMBER,
    to: MY_PHONE_NUMBER,
});
};
