'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { BotMessageSquare, ListTodo } from 'lucide-react';
import type { Task } from '@/lib/types';
import { getAiTaskBreakdownAction } from '@/app/actions';
import { cn } from '@/lib/utils';


interface TaskBreakdownCardProps {
  task: Task;
}

export function TaskBreakdownCard({ task }: TaskBreakdownCardProps) {
  const [breakdown, setBreakdown] = useState<string[]>([]);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreakdown = async () => {
       if(task.completed) {
        setLoading(false);
        setBreakdown([]);
        return;
      }
      setLoading(true);
      const result = await getAiTaskBreakdownAction({
        task: task.title,
        taskType: task.category,
        aversionScore: task.aversion,
      });
      setBreakdown(result.steps);
      setCheckedSteps({});
      setLoading(false);
    };

    fetchBreakdown();
  }, [task]);

  const handleCheckStep = (index: number) => {
    setCheckedSteps(prev => ({ ...prev, [index]: !prev[index] }));
  };

  if(task.completed) return null;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <ListTodo className="h-5 w-5 text-primary" />
            AI Task Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!breakdown || breakdown.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <ListTodo className="h-5 w-5 text-primary" />
          AI Task Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {breakdown.map((step, index) => (
          <div key={index} className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary transition-colors">
            <Checkbox
              id={`step-${index}`}
              checked={!!checkedSteps[index]}
              onCheckedChange={() => handleCheckStep(index)}
            />
            <label
              htmlFor={`step-${index}`}
              className={cn("text-sm cursor-pointer", checkedSteps[index] && "line-through text-muted-foreground")}
            >
              {step}
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
