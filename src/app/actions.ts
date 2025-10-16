'use server';

import { aiTaskBreakdown, type AiTaskBreakdownInput } from '@/ai/flows/ai-task-breakdown';
import { aiTaskGuidance, type AiTaskGuidanceInput } from '@/ai/flows/ai-task-guidance';
import { getSmartReminder, type SmartReminderInput } from '@/ai/flows/smart-ai-reminders';

export const getAiTaskBreakdownAction = async (input: AiTaskBreakdownInput) => {
    try {
        return await aiTaskBreakdown(input);
    } catch (error) {
        console.error("AI Task Breakdown failed:", error);
        return { steps: ["Failed to get AI breakdown. Please try again."] };
    }
};

export const getAiTaskGuidanceAction = async (input: AiTaskGuidanceInput) => {
    try {
        return await aiTaskGuidance(input);
    } catch (error) {
        console.error("AI Task Guidance failed:", error);
        return { guidance: "Failed to get AI guidance. Please try again." };
    }
};

export const getSmartReminderAction = async (input: SmartReminderInput) => {
    try {
        return await getSmartReminder(input);
    } catch (error) {
        console.error("Smart Reminder generation failed:", error);
        return { 
            reminderTiming: "Now",
            motivation: "Could not get a smart reminder, but you can do it!"
        };
    }
};
