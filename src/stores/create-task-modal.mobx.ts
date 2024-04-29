import { TaskEntity, TaskType } from "dto/todo.dto";
import { action, observable } from "mobx";
import { user } from "./user.mobx";

class CreateTaskModalStore implements TaskEntity {
  @observable isOpen: boolean = false;
  @observable header: string = "";
  @observable content: string = "";
  @observable type: TaskType = "work";
  @observable creator: string = user.name;
  @observable till: string = "";
  @observable from: string = "";
  @observable important: boolean = false;
  @observable tasks?: Array<{ isChecked: boolean, content: string }>;
  @observable createdAt: string = new Date()
                                  .toLocaleDateString('en-US', { 
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  });

  
  @action
  close(): void {
    this.isOpen = false;
  }

  @action
  open(): void {
    this.isOpen = true;
  }

  @action
  setHeader(newHeader: string): void {
    this.header = newHeader;
  }

  @action
  setContent(newContent: string): void {
    this.content = newContent;
  }

  @action
  setType(newType: TaskType): void {
    this.type = newType;
  }

  @action
  setTill(time: string): void {
    this.till = time;
  }

  @action
  setFrom(time: string): void {
    this.from = time;
  }

  @action
  setImportant(isImportant: boolean): void {
    this.important = isImportant;
  }

  @action
  setTaskIsChecked(isChecked: boolean, index: number): void {
    this.tasks?.forEach((item, i) => {
      if(i === index) item.isChecked = isChecked;
    });
  }

  @action
  setTaskContent(content: string, index: number): void {
    this.tasks?.forEach((item, i) => {
      if(i === index) item.content = content;
    });
  }
}

export const createTaskModal = new CreateTaskModalStore();