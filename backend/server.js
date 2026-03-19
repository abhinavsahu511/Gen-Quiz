import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the backend .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY environment variable is missing in ../.env");
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

app.post('/api/generate-questions', async (req, res) => {
  try {
    const { topic, count = 10 } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    if (!ai) {
      return res.status(500).json({ error: 'Gemini API is not configured on the server' });
    }

    const prompt = `Generate ${count} multiple choice questions about "${topic}".`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              answer: { type: Type.STRING },
              explanation: {
                type: Type.STRING,
                description: 'A brief explanation of why the answer is correct',
              },
            },
            required: ['question', 'options', 'answer', 'explanation'],
          },
        },
      },
    });

    const jsonStr = response.text.trim();
    const questions = JSON.parse(jsonStr);
    
    res.json(questions);
  } catch (error) {
    console.error('Failed to generate questions:', error);
    res.status(500).json({ error: 'Failed to generate valid questions.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
