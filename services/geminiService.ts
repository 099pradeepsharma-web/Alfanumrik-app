
import { GoogleGenAI, Type } from "@google/genai";
import type { StudentPerformance, Question } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const questionSchema = {
  type: Type.OBJECT,
  properties: {
    questionText: { type: Type.STRING, description: 'The question text.' },
    options: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'An array of 4 possible answers.'
    },
    correctOptionIndex: {
      type: Type.INTEGER,
      description: 'The index (0-3) of the correct option in the options array.'
    },
    explanation: {
      type: Type.STRING,
      description: 'A brief explanation of why the correct answer is right.'
    }
  },
  required: ['questionText', 'options', 'correctOptionIndex', 'explanation']
};

export const generateAdaptiveQuestion = async (subject: string, topic: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<Question | null> => {
  try {
    const prompt = `Generate a unique, high-quality, multiple-choice question for a K-12 student.
    Subject: ${subject}
    Topic: ${topic}
    Difficulty: ${difficulty}
    Ensure the question is clear, the options are plausible, and there is only one correct answer.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: questionSchema,
        temperature: 1,
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as Question;
  } catch (error) {
    console.error("Error generating adaptive question:", error);
    return null;
  }
};

export const generateEQScenario = async (): Promise<string | null> => {
    try {
        const prompt = `You are an expert in social-emotional learning (SEL). Create a short, relatable scenario (3-4 sentences) for a K-12 student in India that involves a common social or emotional challenge (e.g., conflict with a friend, feeling left out, managing exam stress, dealing with peer pressure). The scenario should end with an open-ended question prompting the student to think about how they would respond.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.9,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating EQ scenario:", error);
        return "Could not generate a scenario at this time. Please try again.";
    }
};


export const getTeacherInsights = async (performanceData: StudentPerformance[]): Promise<string | null> => {
  try {
    const prompt = `As an AI teaching assistant, analyze the following student performance data: ${JSON.stringify(performanceData, null, 2)}.
    Provide 3-4 concise, actionable bullet points of insights for the teacher. Focus on identifying overall class trends, students who might need extra help, and students who are excelling. Frame the insights professionally and constructively.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating teacher insights:", error);
    return "Could not generate insights. Please check the data and try again.";
  }
};
