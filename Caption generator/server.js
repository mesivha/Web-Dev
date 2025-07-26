const express = require('express');
const cors = require('cors'); // ✅ Import cors
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());              // ✅ Use CORS middleware
app.use(express.json());      // ✅ Parse JSON body

// Test route
app.get('/', (req, res) => {
  res.send('✅ Server is working!');
});

// POST route
app.post('/generate-caption', async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    res.json({ caption: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

app.listen(5000, () => {
  console.log('✅ Server running at http://localhost:5000');
});
