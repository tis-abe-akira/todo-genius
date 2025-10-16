export type TaskCategory = 'personal' | 'delegated' | 'administrative';

export type Task = {
  id: string;
  title: string;
  category: TaskCategory;
  aversion: number;
  deadline: Date;
  completed: boolean;
};
