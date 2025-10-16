'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, Calendar } from 'lucide-react';
import { type Task } from '@/lib/types';
import { getSmartReminderAction } from '@/app/actions';
import { format } from 'date-fns';

interface SmartReminderCardProps {
  task: Task;
}

export function SmartReminderCard({ task }: SmartReminderCardProps) {
  const [reminder, setReminder] = useState<{ reminderTiming: string, motivation: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminder = async () => {
      if(task.completed) {
        setLoading(false);
        setReminder(null);
        return;
      }
      setLoading(true);
      const result = await getSmartReminderAction({
        taskType: task.category,
        deadline: format(task.deadline, 'yyyy-MM-dd'),
        aversionLevel: task.aversion,
        taskDescription: task.title,
      });
      setReminder(result);
      setLoading(false);
    };

    fetchReminder();
  }, [task]);

  if (task.completed) {
      return null;
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Lightbulb className="h-5 w-5 text-primary" />
            AI Smart Reminder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    );
  }

  if (!reminder) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Lightbulb className="h-5 w-5 text-primary" />
          AI Smart Reminder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground italic">"{reminder.motivation}"</p>
        <div className="flex items-center gap-2 text-sm font-medium bg-primary/10 p-2 rounded-md">
            <Calendar className="h-4 w-4 text-primary" />
            <span>Suggested start date: {reminder.reminderTiming}</span>
        </div>
      </CardContent>
    </Card>
  );
}
