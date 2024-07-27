export interface TodoDto {
  type: TaskType;
  isChecked: boolean;
  header: string;
  creator: string;
  id: number;
  content: string;
  till: string;
  from: string;
  important: boolean;
  tasks: Array<{ isChecked: boolean; content: string }>;
}

export interface TaskEntity {
  type: TaskType;
  header: string;
  till: string;
  from: string;
  important: boolean;
  createdAt: string;
  tasks: Array<{ isChecked: boolean; content: string }>;
}

export type TaskType = 
  | 'school'
  | 'work'
  | 'shop'
  | 'read'
  | 'work out'
  | 'important';

export type UserTasks = Record<TaskType, Array<TodoDto & { type: TaskType }>>;
export type Tasks = Record<"today" | "week" | "month" | "done", TodoDto[]>;