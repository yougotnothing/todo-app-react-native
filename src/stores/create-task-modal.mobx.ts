import { TaskEntity, TaskType } from "dto/todo.dto";
import { action, makeObservable, observable, runInAction } from "mobx";
import { user } from "./user.mobx";

class CreateTaskModalStore implements TaskEntity {
  date: string = `${new Date()
                        .toLocaleTimeString()
                        .split(':')[0]}:${
                    new Date()
                        .toLocaleTimeString()
                        .split(':')[0]}`;
  @observable isOpen: boolean = false;
  @observable header: string = "";
  @observable content: string = "";
  @observable type: TaskType = "work";
  @observable creator: string = user.name;
  @observable till: string = this.date;
  @observable from: string = this.date;
  @observable important: boolean = false;
  @observable tasks?: Array<{ isChecked: boolean, content: string }>;
  @observable createdAt: string = new Date()
                                      .toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long', 
                                        day: 'numeric'
                                      });

  constructor() {
    makeObservable(this);
  }

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
  setIsOpen(isOpen: boolean): void {
    this.isOpen = isOpen;
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
    const splittedTime = time.split(':');
    this.till = `${splittedTime[0]}:${splittedTime[1]}`;
  }

  @action
  setFrom(time: string): void {
    const splittedTime = time.split(':');
    this.from = `${splittedTime[0]}:${splittedTime[1]}`;
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