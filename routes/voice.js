const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const fetch = require('node-fetch'); // Node 18 includes fetch natively, but this ensures compatibility

router.post('/incoming', async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  try {
    const response = await fetch('https://api.openai.com/v1/models');
    const status = response.status;

    console.log("OpenAI status code:", status);

    if (status === 200) {
      twiml.say("Skin Societe voice system is online.");
    } else {
      twiml.say("OpenAI responded with an error.");
    }

  } catch (error) {
    console.error("🔥 Network error:", error);
    twiml.say("Could not connect to OpenAI. Please call back later.");
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

module.exports = router;
