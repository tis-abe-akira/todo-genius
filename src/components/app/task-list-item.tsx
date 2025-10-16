'use client';

import {
  Briefcase,
  FileText,
  Trash2,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { Task, TaskCategory } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface TaskListItemProps {
  task: Task;
  isSelected: boolean;
  onSelect: () => void;
  onToggleComplete: () => void;
  onDelete: () => void;
}

const categoryIcons: Record<TaskCategory, React.ReactNode> = {
  personal: <User className="h-4 w-4" />,
  delegated: <Briefcase className="h-4 w-4" />,
  administrative: <FileText className="h-4 w-4" />,
};

export function TaskListItem({
  task,
  isSelected,
  onSelect,
  onToggleComplete,
  onDelete
}: TaskListItemProps) {
  return (
    <div
      className={cn(
        'group flex items-center p-2 rounded-md cursor-pointer transition-colors',
        isSelected
          ? 'bg-primary/10'
          : 'hover:bg-secondary'
      )}
    >
      <div onClick={onToggleComplete} className="p-2">
         <Checkbox checked={task.completed} />
      </div>
      <div className="flex-grow" onClick={onSelect}>
        <span
          className={cn(
            'text-sm',
            task.completed && 'line-through text-muted-foreground'
          )}
        >
          {task.title}
        </span>
      </div>
       <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="px-2 text-muted-foreground">
                {categoryIcons[task.category]}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="capitalize">{task.category}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
        onClick={(e) => {
            e.stopPropagation();
            onDelete();
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
