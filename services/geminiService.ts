
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIExplanation = async (topic: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert BBA academic tutor. Explain the following topic in simple terms for an undergraduate student: "${topic}". 
      Context for this topic is: ${context}. 
      Break it down into:
      1. A simple definition
      2. 3 key points
      3. A real-world business example.
      Keep the tone encouraging and academic.`,
    });

    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm sorry, I couldn't generate an explanation right now. Please try again later.";
  }
};
