import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY || ''; 
    // In a real app, we'd handle the missing key more gracefully, 
    // but the prompt guidance says assume it's valid.
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const generateMinistryResponse = async (userMessage: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: `You are a compassionate, wise, and biblically-grounded spiritual assistant for 'Agni Jawala Ministries' (Fire Flame Ministries). 
        Your goal is to provide comfort, prayer, biblical answers, and information about the church.
        - Tone: Warm, encouraging, respectful, and faith-filled.
        - If someone asks for prayer, write a short, powerful prayer for them.
        - If someone asks a bible question, answer it clearly with scripture references.
        - Keep responses concise (under 150 words) unless a deep explanation is needed.
        - Do not be judgmental.
        - Context: Agni Jawala is a vibrant, modern church focused on revival and community.`,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, I am having trouble connecting right now. Please try again later.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "I am currently experiencing a temporary pause in my spirit. Please check your connection and try again.";
  }
};