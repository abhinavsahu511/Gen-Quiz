import { GoogleGenAI, Type } from "@google/genai";

export async function generateQuestions(topic, count = 10) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY environment variable is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Generate ${count} multiple choice questions about "${topic}".`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview", // use stable public model
    contents: prompt,
    config: {
      responseMimeType: "application/json",
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
              description: "A brief explanation of why the answer is correct",
            },
          },
          required: ["question", "options", "answer", "explanation"],
        },
      },
    },
  });

  try {
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Failed to generate valid questions.");
  }
}