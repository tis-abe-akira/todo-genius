'use server';

/**
 * @fileOverview A smart AI reminder flow that adjusts timing based on task type, deadline, and aversion level.
 *
 * - getSmartReminder - A function that generates a smart reminder.
 * - SmartReminderInput - The input type for the getSmartReminder function.
 * - SmartReminderOutput - The return type for the getSmartReminder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartReminderInputSchema = z.object({
  taskType: z.enum(['personal', 'work', 'administrative']).describe('The type of task.'),
  deadline: z.string().describe('The deadline for the task (e.g., YYYY-MM-DD).'),
  aversionLevel: z.number().min(1).max(5).describe('Aversion level from 1 (low) to 5 (high).'),
  taskDescription: z.string().describe('A brief description of the task.'),
});
export type SmartReminderInput = z.infer<typeof SmartReminderInputSchema>;

const SmartReminderOutputSchema = z.object({
  reminderTiming: z.string().describe('Suggested reminder date (YYYY-MM-DD) to start the task.'),
  motivation: z.string().describe('A motivational message to encourage task initiation.'),
});
export type SmartReminderOutput = z.infer<typeof SmartReminderOutputSchema>;

export async function getSmartReminder(input: SmartReminderInput): Promise<SmartReminderOutput> {
  return smartReminderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartReminderPrompt',
  input: {schema: SmartReminderInputSchema},
  output: {schema: SmartReminderOutputSchema},
  prompt: `You are a smart reminder assistant designed to provide the optimal time to start a task based on its type, deadline, and aversion level.

  Task Type: {{taskType}}
  Deadline: {{deadline}}
  Aversion Level: {{aversionLevel}} (1-5, 5 being highest aversion)
  Task Description: {{taskDescription}}

  Consider the following factors when determining the reminder timing:
  - Administrative tasks and tasks with high aversion levels should be started earlier to allow for more time and reduce stress.
  - Personal and work tasks can be started closer to the deadline, especially if the aversion level is low.

  Respond with the suggested reminder date (YYYY-MM-DD) and a motivational message to encourage task initiation.

  Output:
  { reminderTiming: string, motivation: string }`,
});

const smartReminderFlow = ai.defineFlow(
  {
    name: 'smartReminderFlow',
    inputSchema: SmartReminderInputSchema,
    outputSchema: SmartReminderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
