
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const twilio = require('twilio');

const openai = new OpenAI({
      apiKey: "sk-proj-bsrJObWU9AwOhXwWU0yneN9vG9TJ0cvLyRp__DJ8ZraeHwvQMvhhsj_BDaPnpuIurD3tDA"});

router.post('/incoming', async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  try {
    const userPrompt = "Answer the phone like a polite skin clinic receptionist and ask how you can help.";
    const completion = await openai.chat.completions.create({
      model: process.env.VOICE_MODEL || "gpt-4o",
      messages: [{ role: "system", content: userPrompt }]
    });

    twiml.say(completion.choices[0].message.content);
    res.type('text/xml');
    res.send(twiml.toString());
  } catch (error) {
    console.error("Error:", error);
    twiml.say("Sorry, something went wrong.");
    res.type('text/xml');
    res.send(twiml.toString());
  }
});

module.exports = router;
