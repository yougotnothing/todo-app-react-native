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
  tasks?: Array<{ isChecked: boolean, content: string }>;
}

export interface TaskEntity {
  type: TaskType;
  header: string;
  till: string;
  from: string;
  important: boolean;
  createdAt: string;
  tasks: Array<{ isChecked: boolean, content: string }>;
}

export interface UserTasks {
  "school": Array<TodoDto & { type: 'school' }>;
  "work": Array<TodoDto & { type: 'work' }>;
  "shop": Array<TodoDto & { type: 'shop' }>;
  "read": Array<TodoDto & { type: 'read' }>;
  "work out": Array<TodoDto & { type: 'work out' }>;
}


export type TaskType = 
  |'school'
  | 'work'
  | 'shop'
  | 'read'
  | 'work out';