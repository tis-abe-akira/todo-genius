'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Briefcase,
  Calendar,
  FileText,
  Smile,
  User,
} from 'lucide-react';
import type { Task, TaskCategory } from '@/lib/types';
import { format } from 'date-fns';
import { SmartReminderCard } from './smart-reminder-card';
import { TaskBreakdownCard } from './task-breakdown-card';
import { TaskGuidanceCard } from './task-guidance-card';

interface TaskDetailsProps {
  task: Task | null;
}

const categoryIcons: Record<TaskCategory, React.ReactNode> = {
  personal: <User className="h-4 w-4 text-muted-foreground" />,
  delegated: <Briefcase className="h-4 w-4 text-muted-foreground" />,
  administrative: <FileText className="h-4 w-4 text-muted-foreground" />,
};

export function TaskDetails({ task }: TaskDetailsProps) {
  if (!task) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>Select a task to see its details</p>
          <p className="text-xs">or add a new one to get started!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{task.title}</CardTitle>
        <CardDescription>
          {task.completed ? "Completed" : "Not completed"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            {categoryIcons[task.category]}
            <span className='capitalize'>{task.category}</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{format(task.deadline, 'PPP')}</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <Smile className="h-4 w-4" />
            <span>Aversion: {task.aversion}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
            <SmartReminderCard task={task} />
            <TaskBreakdownCard task={task} />
            {task.category === 'administrative' && <TaskGuidanceCard task={task} />}
        </div>
      </CardContent>
    </Card>
  );
}
