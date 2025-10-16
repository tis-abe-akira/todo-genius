'use client';

import { useEffect, useState } from 'react';
import { PartyPopper } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Task } from '@/lib/types';

interface CelebrationDialogProps {
  task: Task | null;
  onOpenChange: (isOpen: boolean) => void;
}

const messages = [
  "You're a genius!",
  "Incredible work!",
  "Task conquered!",
  "Outstanding!",
  "That's how it's done!",
];

export function CelebrationDialog({ task, onOpenChange }: CelebrationDialogProps) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (task) {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  }, [task]);
  
  return (
    <Dialog open={!!task} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center text-center gap-4">
            <PartyPopper className="h-16 w-16 text-primary" />
            <span className="text-2xl font-bold font-headline">{message}</span>
          </DialogTitle>
          <div className="text-center text-muted-foreground pt-2">
            You completed: <span className="font-semibold text-foreground">{task?.title}</span>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
