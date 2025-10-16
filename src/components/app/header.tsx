'use client';

import { BrainCircuit, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AddTaskDialog } from './add-task-dialog';
import type { Task } from '@/lib/types';

interface AppHeaderProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

export function AppHeader({ onAddTask }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex items-center justify-between h-16 max-w-7xl px-4 md:px-6">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold tracking-tight text-foreground font-headline">
            TodoGenius
          </h1>
        </div>
        <AddTaskDialog onAddTask={onAddTask}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </AddTaskDialog>
      </div>
    </header>
  );
}
