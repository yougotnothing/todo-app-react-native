export interface TodoDto {
  isChecked: boolean;
  header: string;
  creator: string;
  id: number;
  content: string;
  till: string;
  from: string;
  tasks?: Array<{ isChecked: boolean, content: string }>;
}