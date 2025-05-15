const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const fetch = require('node-fetch');

router.post('/incoming', async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    console.log("💬 OpenAI Raw Response:", JSON.stringify(data));

    if (response.status === 200) {
      twiml.say("OpenAI connection test passed.");
    } else {
      twiml.say("OpenAI authentication failed. Check your API key.");
    }

  } catch (error) {
    console.error("❌ Network or fetch error:", error);
    twiml.say("OpenAI could not be reached. Please call back later.");
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

module.exports = router;
