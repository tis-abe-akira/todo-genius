'use server';
/**
 * @fileOverview AI task breakdown flow that simplifies daunting tasks into manageable steps.
 *
 * - aiTaskBreakdown - A function that breaks down a task into smaller steps.
 * - AiTaskBreakdownInput - The input type for the aiTaskBreakdown function.
 * - AiTaskBreakdownOutput - The return type for the aiTaskBreakdown function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiTaskBreakdownInputSchema = z.object({
  task: z.string().describe('The task to be broken down.'),
  taskType: z.enum(['personal', 'delegated', 'administrative']).describe('The type of task.'),
  aversionScore: z.number().min(1).max(5).describe('The level of aversion to the task (1-5).'),
});
export type AiTaskBreakdownInput = z.infer<typeof AiTaskBreakdownInputSchema>;

const AiTaskBreakdownOutputSchema = z.object({
  steps: z.array(z.string()).describe('A list of smaller steps to complete the task.'),
});
export type AiTaskBreakdownOutput = z.infer<typeof AiTaskBreakdownOutputSchema>;

export async function aiTaskBreakdown(input: AiTaskBreakdownInput): Promise<AiTaskBreakdownOutput> {
  return aiTaskBreakdownFlow(input);
}

const taskBreakdownPrompt = ai.definePrompt({
  name: 'taskBreakdownPrompt',
  input: {schema: AiTaskBreakdownInputSchema},
  output: {schema: AiTaskBreakdownOutputSchema},
  prompt: `You are a helpful task management assistant. Break down the given task into smaller, more manageable steps.

Consider the task type and aversion score when determining the level of detail in the steps.

Task: {{{task}}}
Task Type: {{{taskType}}}
Aversion Score: {{{aversionScore}}}

Steps:`,
});

const aiTaskBreakdownFlow = ai.defineFlow(
  {
    name: 'aiTaskBreakdownFlow',
    inputSchema: AiTaskBreakdownInputSchema,
    outputSchema: AiTaskBreakdownOutputSchema,
  },
  async input => {
    const {output} = await taskBreakdownPrompt(input);
    return output!;
  }
);
