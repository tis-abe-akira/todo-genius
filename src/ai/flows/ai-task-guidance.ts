'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing detailed, step-by-step instructions for administrative tasks using AI.
 *
 * - aiTaskGuidance - The function to generate task guidance.
 * - AiTaskGuidanceInput - The input type for the aiTaskGuidance function.
 * - AiTaskGuidanceOutput - The output type for the aiTaskGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiTaskGuidanceInputSchema = z.object({
  task: z.string().describe('The administrative task to provide guidance for.'),
});
export type AiTaskGuidanceInput = z.infer<typeof AiTaskGuidanceInputSchema>;

const AiTaskGuidanceOutputSchema = z.object({
  guidance: z.string().describe('Detailed, step-by-step instructions for completing the task.'),
});
export type AiTaskGuidanceOutput = z.infer<typeof AiTaskGuidanceOutputSchema>;

export async function aiTaskGuidance(input: AiTaskGuidanceInput): Promise<AiTaskGuidanceOutput> {
  return aiTaskGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTaskGuidancePrompt',
  input: {schema: AiTaskGuidanceInputSchema},
  output: {schema: AiTaskGuidanceOutputSchema},
  prompt: `You are an AI assistant that provides detailed, step-by-step instructions for completing administrative tasks.

  Provide clear and concise instructions for the following task:

  {{task}}`,
});

const aiTaskGuidanceFlow = ai.defineFlow(
  {
    name: 'aiTaskGuidanceFlow',
    inputSchema: AiTaskGuidanceInputSchema,
    outputSchema: AiTaskGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
