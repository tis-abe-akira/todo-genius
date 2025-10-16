'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LifeBuoy } from 'lucide-react';
import type { Task } from '@/lib/types';
import { getAiTaskGuidanceAction } from '@/app/actions';

interface TaskGuidanceCardProps {
  task: Task;
}

export function TaskGuidanceCard({ task }: TaskGuidanceCardProps) {
  const [guidance, setGuidance] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuidance = async () => {
      if (task.category !== 'administrative' || task.completed) {
        setLoading(false);
        setGuidance(null);
        return;
      }
      setLoading(true);
      const result = await getAiTaskGuidanceAction({ task: task.title });
      setGuidance(result.guidance);
      setLoading(false);
    };

    fetchGuidance();
  }, [task]);
  
  if (task.category !== 'administrative' || task.completed) {
      return null;
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <LifeBuoy className="h-5 w-5 text-primary" />
            AI Task Guidance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (!guidance) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <LifeBuoy className="h-5 w-5 text-primary" />
          AI Task Guidance
        </CardTitle>
        <CardDescription>Step-by-step help for your administrative task.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none text-foreground dark:prose-invert">
            <p>{guidance}</p>
        </div>
      </CardContent>
    </Card>
  );
}
