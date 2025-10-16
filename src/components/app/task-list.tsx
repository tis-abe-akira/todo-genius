'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { Task } from '@/lib/types';
import { TaskListItem } from './task-list-item';

interface TaskListProps {
  tasks: Task[];
  selectedTask: Task | null;
  onSelectTask: (task: Task) => void;
  onToggleComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskList({
  tasks,
  selectedTask,
  onSelectTask,
  onToggleComplete,
  onDeleteTask
}: TaskListProps) {

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Your Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground px-4">Active</h3>
                {activeTasks.length > 0 ? (
                    activeTasks.map(task => (
                        <TaskListItem
                            key={task.id}
                            task={task}
                            isSelected={selectedTask?.id === task.id}
                            onSelect={() => onSelectTask(task)}
                            onToggleComplete={() => onToggleComplete(task.id)}
                            onDelete={() => onDeleteTask(task.id)}
                        />
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground px-4 py-2">No active tasks. Great job!</p>
                )}
            </div>

            {completedTasks.length > 0 && (
                <div className="mt-6 space-y-2">
                    <Separator />
                    <h3 className="text-sm font-medium text-muted-foreground px-4 pt-4">Completed</h3>
                    {completedTasks.map(task => (
                        <TaskListItem
                            key={task.id}
                            task={task}
                            isSelected={selectedTask?.id === task.id}
                            onSelect={() => onSelectTask(task)}
                            onToggleComplete={() => onToggleComplete(task.id)}
                            onDelete={() => onDeleteTask(task.id)}
                        />
                    ))}
                </div>
            )}

        </ScrollArea>
      </CardContent>
    </Card>
  );
}
