import { GroqResponse } from '../types';

const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const generateInstructions = async (
  description: string,
  actions: string,
  objects: string
): Promise<string> => {
  try {
    const prompt = `Based on the following information, generate clear, step-by-step instructions on how to accomplish the task:

Description: ${description}
Actions: ${actions}
Objects: ${objects}

IMPORTANT FORMATTING REQUIREMENTS:
- Do NOT use asterisks (*) anywhere in your response
- Format as a numbered list (1., 2., 3., etc.)
- After each numbered step, add a new line with "Step Type: [TYPE]" where TYPE is one of: Preparation, Action, Verification, Safety, Documentation, or Analysis
- Use clear, concise language
- Focus on practical implementation
- Include important considerations

Example format:
1. First instruction step here
Step Type: Preparation

2. Second instruction step here  
Step Type: Action

Please provide detailed, actionable instructions following this exact format.`;

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that creates clear, step-by-step instructions for tasks. Always follow the exact formatting requirements provided by the user. Never use asterisks (*) in your responses. Always include step types after each numbered instruction.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
    }

    const data: GroqResponse = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from Groq API');
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating instructions:', error);
    throw new Error(
      error instanceof Error 
        ? `Failed to generate instructions: ${error.message}`
        : 'Failed to generate instructions'
    );
  }
};