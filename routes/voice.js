const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const twilio = require('twilio');

// HARD-CODED API KEY FOR TESTING
const openai = new OpenAI({
  apiKey: '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'
});

router.post('/incoming', async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  try {
    const prompt = "You're a friendly receptionist at Skin Societe. Greet the caller warmly and ask how you can assist.";

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use "gpt-4o" only if your account supports it
      messages: [
        { role: "system", content: prompt }
      ],
      temperature: 0.7,
    });

    const message = completion?.choices?.[0]?.message?.content || "Hi, how can I help you today?";
    twiml.say(message);

  } catch (error) {
    console.error("💥 OpenAI Error:", error);
    twiml.say("Sorry, something went wrong. Please call back later.");
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

module.exports = router;
