
import { GoogleGenAI, Type } from "@google/genai";

// Always use process.env.API_KEY directly as per guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface LabelAnalysisResult {
  nutritionalSummary: string;
  ingredientBreakdown: {
    name: string;
    role: string;
    impact: string;
  }[];
  healthRecommendations: string[];
}

export interface WeeklyMealPlan {
  days: {
    day: number;
    meals: {
      type: string;
      name: string;
      description: string;
    }[];
  }[];
  groceryList: string;
}

export const analyzeLabel = async (
  textInput?: string, 
  imageInput?: { data: string, mimeType: string },
  manualData?: { name: string, percentage: string }[]
): Promise<LabelAnalysisResult | null> => {
  const ai = getAI();
  
  let manualContext = "";
  if (manualData && manualData.length > 0) {
    manualContext = "\nMANUAL OVERRIDES (Use these as absolute ground truth): " + 
      manualData.map(d => `${d.name}: ${d.percentage}%`).join(", ");
  }

  const prompt = `Act as a professional nutritionist and food scientist. Analyze this food label or ingredient list. 
    Provide a highly structured, categorized analysis based on the input provided. 
    
    Categorization Rules:
    1. Nutritional Summary: Focus on the macro-profile and caloric quality.
    2. Ingredient Breakdown: Itemize key ingredients, identifying their industrial role (e.g. Preservative, Natural Sweetener) and their biological impact.
    3. Health Recommendations: 3-5 non-judgemental, actionable tips for a busy professional.
    
    ${manualContext}
    
    Tone: Supportively clinical, encouraging literacy.`;

  const parts: any[] = [{ text: prompt }];

  if (textInput) {
    parts.push({ text: `Text input from user: ${textInput}` });
  }

  if (imageInput) {
    parts.push({
      inlineData: {
        data: imageInput.data,
        mimeType: imageInput.mimeType
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nutritionalSummary: { type: Type.STRING },
            ingredientBreakdown: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                  impact: { type: Type.STRING }
                },
                required: ["name", "role", "impact"]
              }
            },
            healthRecommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["nutritionalSummary", "ingredientBreakdown", "healthRecommendations"]
        }
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Analysis parsing error:", error);
    return null;
  }
};

export const generateHealthInsight = async (reflections: Record<string, string>) => {
  const ai = getAI();
  const reflectionString = Object.entries(reflections)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  const prompt = `Act as a supportive wellness coach. Analyze these weekly self-reflections:
  ${reflectionString}
  
  Please provide:
  1. **The Week's Narrative**: A 2-3 sentence supportive summary identifying a pattern (specifically look for correlations between Sleep Quality, Mood Balance, and Energy levels).
  2. **Gentle Observations**: Observations about their food, water, and stress balance without using scores or numbers.
  3. **3 Micro-Steps**: Tiny, actionable tips for next week (e.g., "Add one extra glass of water before your first coffee").
  
  TONE: Non-medical, non-judgemental, encouraging, and focused on self-awareness. NO COMPARISONS OR SCORING.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });

  return response.text;
};

export const suggestMeals = async (category: string, preference: string, ingredients?: string) => {
  const ai = getAI();
  
  const prompt = `Act as an expert Indian chef and lifestyle nutritionist. 
  Suggest 3-4 meal options based on the following selection:
  CATEGORY: ${category}
  USER PREFERENCE: ${preference}
  AVAILABLE INGREDIENTS: ${ingredients || "None provided"}
  
  CONTEXT & RULES:
  1. **Local Focus**: Focus strictly on common Indian food items and ingredients (e.g., Poha, Paneer, Dal, Oats, Eggs, Seasonal Veggies, Curd, Rice, Wheat/Roti).
  2. **Student/Bachelor Reality**: Assume limited equipment (Induction stove, Electric kettle, or a single Pan). 
  3. **Ingredient Parsing**: Recognize synonyms (e.g., "Curd" and "Dahi") and be creative with the user's specific items.
  4. **Category Adherence**: If the category is "No-Cook", ensure absolutely no stove usage. If "Smoothie", ensure it's drinkable.
  5. **Goal Based**: If a goal like "Weight Gain" or "Weight Loss" is provided, adjust the caloric density and portion advice accordingly.
  
  AUDIENCE: Busy Indian adults, students in hostels, and bachelors living in PGs.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          meals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                prepTime: { type: Type.STRING },
                difficulty: { type: Type.STRING },
                ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                instructions: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["name", "description", "prepTime", "difficulty", "ingredients", "instructions"]
            }
          }
        },
        required: ["meals"]
      }
    },
  });

  try {
    return JSON.parse(response.text || '{"meals":[]}');
  } catch (e) {
    return { meals: [] };
  }
};

export const generateSmartGroceryList = async (mealPlan: string) => {
  const ai = getAI();
  const prompt = `
    Analyze this weekly meal plan and generate a highly organized, aggregated grocery list.
    Meal Plan Data: ${mealPlan}

    MANDATORY RULES:
    1. Organize items by these EXACT categories using Markdown H1 headers (e.g., # PRODUCE):
       # PRODUCE
       # PROTEIN & DAIRY
       # GRAINS & PANTRY
       # OTHERS
    2. Aggregate duplicates. If 'Onions' are needed for 3 meals, list them once with the total quantity.
    3. Use the format: "- Item Name (Quantity/Estimated Amount)"
    4. Provide clear, estimated quantities for a single adult.
    5. Return ONLY the markdown list. No conversational text.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });

  return response.text;
};

export const generateWeeklyMealPlan = async (config: {
  diet: string,
  skill: string,
  budget: string,
  mealsPerDay: number,
  people: number,
  timeAvailable: number
}): Promise<WeeklyMealPlan> => {
  const ai = getAI();
  const prompt = `Act as an expert nutritionist and meal planner. Create a professional 7-day meal plan for ${config.people} people.
  
  USER PROFILE:
  - Diet Type: ${config.diet}
  - Cooking Skill: ${config.skill}
  - Budget: ${config.budget}
  - Meals/Day: ${config.mealsPerDay}
  - Time Available per Meal: ${config.timeAvailable} minutes
  
  CONTEXT: Focus on common, healthy, and accessible ingredients. If the diet is "Balanced", include a mix of proteins, complex carbs, and healthy fats. For Indian context, use staples like Dal, Rice, Roti, Paneer, Eggs, etc.
  
  RESPONSE FORMAT:
  1. A 7-day schedule.
  2. For each day, list ${config.mealsPerDay} meals.
  3. A comprehensive, organized grocery list aggregated for the entire week.
  
  Return in JSON format strictly following the provided schema.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.NUMBER },
                meals: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      type: { type: Type.STRING },
                      name: { type: Type.STRING },
                      description: { type: Type.STRING }
                    },
                    required: ["type", "name", "description"]
                  }
                }
              },
              required: ["day", "meals"]
            }
          },
          groceryList: { type: Type.STRING, description: "Markdown list of groceries" }
        },
        required: ["days", "groceryList"]
      }
    }
  });

  return JSON.parse(response.text);
};
