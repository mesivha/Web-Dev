const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
app.get('/', (req, res) => {
  res.send('Server is working!');
});
app.post('/generate-caption', async (req, res) => {
  const { prompt } = req.body;
  console.log('Received prompt:', prompt);
  console.log('API Key loaded:', process.env.GEMINI_API_KEY?.substring(0, 5));
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required and must be a string' });
  }
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const caption = response.text().trim();

    res.json({ caption });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Gemini request failed' });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});