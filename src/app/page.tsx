'use client';

import { useState } from 'react';
import type { Task } from '@/lib/types';
import { AppHeader } from '@/components/app/header';
import { TaskList } from '@/components/app/task-list';
import { TaskDetails } from '@/components/app/task-details';
import { CelebrationDialog } from '@/components/app/celebration-dialog';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Submit monthly expense report',
    category: 'administrative',
    aversion: 5,
    deadline: new Date(new Date().setDate(new Date().getDate() + 5)),
    completed: false,
  },
  {
    id: '2',
    title: 'Prepare presentation for team meeting',
    category: 'delegated',
    aversion: 2,
    deadline: new Date(new Date().setDate(new Date().getDate() + 3)),
    completed: false,
  },
  {
    id: '3',
    title: 'Go for a 30-minute run',
    category: 'personal',
    aversion: 1,
    deadline: new Date(new Date().setDate(new Date().getDate() + 1)),
    completed: true,
  },
    {
    id: '4',
    title: 'Complete mandatory e-learning course',
    category: 'administrative',
    aversion: 4,
    deadline: new Date(new Date().setDate(new Date().getDate() + 14)),
    completed: false,
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(tasks.find(t => !t.completed) || null);
  const [completedTask, setCompletedTask] = useState<Task | null>(null);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const taskWithId: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks(prevTasks => [taskWithId, ...prevTasks]);
    setSelectedTask(taskWithId);
  };

  const handleToggleComplete = (taskId: string) => {
    let justCompletedTask: Task | null = null;
    setTasks(
      tasks.map(task => {
        if (task.id === taskId) {
          const updatedTask = { ...task, completed: !task.completed };
          if(updatedTask.completed) {
            justCompletedTask = updatedTask;
          }
          return updatedTask;
        }
        return task;
      })
    );
    if(justCompletedTask) {
        setCompletedTask(justCompletedTask);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader onAddTask={handleAddTask} />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-7xl mx-auto">
          <div className="md:col-span-2">
            <TaskList
              tasks={tasks}
              selectedTask={selectedTask}
              onSelectTask={setSelectedTask}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
            />
          </div>
          <div className="md:col-span-3">
            <TaskDetails task={selectedTask} />
          </div>
        </div>
      </main>
      <CelebrationDialog
        task={completedTask}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setCompletedTask(null);
          }
        }}
      />
    </div>
  );
}
