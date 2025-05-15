const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const twilio = require('twilio');

const openai = new OpenAI({
  apiKey: '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'
});

router.post('/incoming', async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Say hello from Skin Societe.' }],
      max_tokens: 20,
    });

    const message = completion.choices[0].message.content;
    console.log("OpenAI says:", message);
    twiml.say(message);

  } catch (error) {
    console.error("💥 OpenAI API ERROR:", error);
    twiml.say("Sorry, something went wrong. Please call back later.");
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

module.exports = router;
