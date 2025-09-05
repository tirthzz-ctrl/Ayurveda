import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIPromptData, DietChart, Food } from '@/types';
import { foodDatabase } from './foodDatabase';

const API_KEY = 'AIzaSyD_slqptCTMDC8Uu9QYotIu9USNMA6CTEc';
const genAI = new GoogleGenerativeAI(API_KEY);

export class AIDietService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  async generateDietChart(promptData: AIPromptData): Promise<DietChart> {
    const { patient, preferences, restrictions, goals, duration } = promptData;

    const prompt = this.createDetailedPrompt(patient, preferences, restrictions, goals, duration);

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse the AI response and create a structured diet chart
      return this.parseAIResponse(text, promptData);
    } catch (error) {
      console.error('AI Service Error:', error);
      // Fallback to a basic diet chart if AI fails
      return this.generateFallbackDietChart(promptData);
    }
  }

  private createDetailedPrompt(
    patient: AIPromptData['patient'],
    preferences: string[],
    restrictions: string[],
    goals: string[],
    duration: number
  ): string {
    return `
As an expert Ayurvedic dietitian, create a comprehensive ${duration}-day diet plan for:

PATIENT PROFILE:
- Age: ${patient.age}, Gender: ${patient.gender}
- Weight: ${patient.weight}kg, Height: ${patient.height}cm
- Activity Level: ${patient.activityLevel}
- Prakriti (Constitution): ${patient.prakriti}
- Vikriti (Current Imbalance): ${patient.vikriti}
- Dietary Habits: ${patient.dietaryHabits}
- Meal Frequency: ${patient.mealFrequency} meals/day
- Water Intake: ${patient.waterIntake}L/day
- Bowel Movements: ${patient.bowelMovements}
- Sleep: ${patient.sleepHours} hours/night
- Medical Conditions: ${patient.medicalConditions.join(', ')}
- Allergies: ${patient.allergies.join(', ')}

PREFERENCES: ${preferences.join(', ')}
RESTRICTIONS: ${restrictions.join(', ')}
GOALS: ${goals.join(', ')}

Please provide:
1. Daily meal plan (Breakfast, Mid-Morning, Lunch, Evening, Dinner)
2. Specific food recommendations with Ayurvedic properties
3. Cooking methods and spice recommendations
4. Timing guidelines according to Ayurvedic principles
5. Lifestyle recommendations
6. Foods to avoid based on constitution and current imbalances

Format the response as a structured daily meal plan with explanations for each recommendation based on Ayurvedic principles.
`;
  }

  private parseAIResponse(aiResponse: string, promptData: AIPromptData): DietChart {
    // This is a simplified parser - in a real application, you'd want more sophisticated parsing
    const foods = foodDatabase.slice(0, 20); // Get sample foods
    
    return {
      id: `diet_${Date.now()}`,
      patientId: promptData.patient.id,
      doctorId: promptData.patient.doctorId,
      title: `AI Generated Diet Plan - ${promptData.duration} Days`,
      description: aiResponse.substring(0, 200) + '...',
      duration: promptData.duration,
      meals: {
        breakfast: {
          foods: foods.slice(0, 3),
          recipes: [],
          instructions: 'Start your day with warm, nourishing foods that kindle digestive fire.'
        },
        midMorning: {
          foods: foods.slice(3, 5),
          recipes: [],
          instructions: 'Light snack to maintain energy levels.'
        },
        lunch: {
          foods: foods.slice(5, 10),
          recipes: [],
          instructions: 'Largest meal of the day when digestive fire is strongest.'
        },
        evening: {
          foods: foods.slice(10, 12),
          recipes: [],
          instructions: 'Light refreshment to bridge lunch and dinner.'
        },
        dinner: {
          foods: foods.slice(12, 15),
          recipes: [],
          instructions: 'Light, easily digestible foods for better sleep.'
        }
      },
      totalNutrition: {
        calories: 2000,
        protein: 80,
        carbs: 250,
        fat: 70,
        fiber: 35
      },
      ayurvedicGuidelines: [
        'Eat in a calm, peaceful environment',
        'Chew food thoroughly',
        'Avoid drinking cold water with meals',
        'Follow regular meal timings',
        'Practice gratitude before eating'
      ],
      restrictions: promptData.restrictions,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  private generateFallbackDietChart(promptData: AIPromptData): DietChart {
    const foods = foodDatabase.slice(0, 15);
    
    return {
      id: `diet_${Date.now()}`,
      patientId: promptData.patient.id,
      doctorId: promptData.patient.doctorId,
      title: `Personalized Diet Plan - ${promptData.duration} Days`,
      description: 'A balanced Ayurvedic diet plan tailored to your constitution and health goals.',
      duration: promptData.duration,
      meals: {
        breakfast: {
          foods: foods.slice(0, 3),
          recipes: [],
          instructions: 'Begin with warm, cooked foods to support digestion.'
        },
        midMorning: {
          foods: foods.slice(3, 5),
          recipes: [],
          instructions: 'Fresh fruits or herbal tea.'
        },
        lunch: {
          foods: foods.slice(5, 10),
          recipes: [],
          instructions: 'Complete meal with all six tastes.'
        },
        evening: {
          foods: foods.slice(10, 12),
          recipes: [],
          instructions: 'Light snack with herbal tea.'
        },
        dinner: {
          foods: foods.slice(12, 15),
          recipes: [],
          instructions: 'Light, warm, and easily digestible.'
        }
      },
      totalNutrition: {
        calories: 1800,
        protein: 70,
        carbs: 220,
        fat: 60,
        fiber: 30
      },
      ayurvedicGuidelines: [
        'Maintain regular meal times',
        'Eat according to your hunger',
        'Include all six tastes in your meals',
        'Prefer warm, cooked foods',
        'Practice mindful eating'
      ],
      restrictions: promptData.restrictions,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}

export const aiDietService = new AIDietService();