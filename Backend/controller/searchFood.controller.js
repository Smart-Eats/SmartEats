import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const SEARCH_FOOD_ITEM = async (req, res) => {
  const { foodItem } = req.body;
  try {
    const prompt = `
    You are a food nutrition expert. 
      Provide accurate nutrition facts for ${foodItem} in JSON format with these fields:
      Do NOT assume it is invalid unless it clearly isn't edible or is a non-food object.
      - name (string)
      - description (string)
      - calories (number)
      - fat (string with unit)
      - carbs (string with unit)
      - protein (string with unit)
      - fiber (string with unit)
      - sugar (string with unit)
      - potassium (string with unit)
      - vitaminC (string with unit)
      - servingSize (string)
      - benefits (array of strings)
      If it is not a food item (e.g., "car", "bike", "iPhone"), respond with:
        {
        "error": "Invalid input: Not a food item."
        }
      Example response format:
      {
        "name": "banana",
        "description": "A sweet, elongated, yellow fruit rich in potassium.",
        "calories": 89,
        "fat": "0.3g",
        "carbs": "23g",
        "protein": "1.1g",
        "fiber": "2.6g",
        "sugar": "12g",
        "potassium": "358mg",
        "vitaminC": "8.7mg",
        "servingSize": "1 medium (118g)",
        "benefits": [
          "Rich in potassium which supports heart health",
          "Good source of fiber for digestive health"
        ]
      }
    `;
    const aiResponse = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo", // Use a reliable model
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });
    const content = aiResponse.choices[0].message.content;
    const nutritionData = JSON.parse(content);
    if (nutritionData.error) {
      return res.status(400).json({ error: nutritionData.error });
    }
    return res.status(200).json(nutritionData);
  } catch (error) {
    console.error("AI API error:", error);
    return res.status(500).json({ error: "Failed to get nutrition data" });
  }
};
