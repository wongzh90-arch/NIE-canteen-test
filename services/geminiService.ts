import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartRecommendation = async (
  userPreferences: string,
  currentTime: string
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      You are a smart canteen assistant for the National Institute of Education (NIE) in Singapore.
      The user wants a recommendation for food.
      
      Context:
      - We want to optimize for efficiency (fast prep time) and cost (avoiding peak pricing if possible).
      - Current Peak Hours: 12:00 PM - 1:00 PM (1.3x price).
      - Off-peak: Before 11:30 AM or After 2:00 PM (0.8x - 0.9x price).
      - Available Stalls: Chicken Rice (Fast), Vegetarian (Fast), Mala (Slow), Western (Medium), Prata (Fast).
      
      User Preferences: "${userPreferences}"
      Current Time Context: "${currentTime}"
      
      Provide a short, helpful recommendation in JSON format with the following structure:
      {
        "recommendation": "Name of dish",
        "reason": "Why this is good (efficiency/price/taste)",
        "suggestedTime": "Best time to pickup",
        "estimatedSavings": "Amount saved vs peak"
      }
      Only return the JSON string, no markdown code blocks.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return JSON.stringify({
      recommendation: "Chicken Rice",
      reason: "It's a classic and the queue moves fast!",
      suggestedTime: "11:30 AM",
      estimatedSavings: "$0.50"
    });
  }
};
