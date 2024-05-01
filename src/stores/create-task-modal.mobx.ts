import { TaskEntity, TaskType } from "dto/todo.dto";
import { action, makeObservable, observable, runInAction } from "mobx";
import { user } from "./user.mobx";

class CreateTaskModalStore implements TaskEntity {
  @observable
  isOpen: boolean = false;
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

  constructor() {
    makeObservable(this);
  }
  
  close(): void {
    runInAction(() => {
      this.isOpen = false;
    });
  }

  @action
  open(): void {
    runInAction(() => {
      this.isOpen = true;
    });
  }

  @action
  setHeader(newHeader: string): void {
    runInAction(() => {
      this.header = newHeader;
    });
  }

  @action
  setIsOpen(isOpen: boolean): void {
    runInAction(() => {
      this.isOpen = isOpen;
    });
  }

  @action
  setContent(newContent: string): void {
    runInAction(() => {
      this.content = newContent;
    });
  }

  @action
  setType(newType: TaskType): void {
    runInAction(() => {
      this.type = newType;
    });
  }

  @action
  setTill(time: string): void {
    runInAction(() => {
      this.till = time;
    });
  }

  @action
  setFrom(time: string): void {
    runInAction(() => {
      this.from = time;
    });
  }

  @action
  setImportant(isImportant: boolean): void {
    runInAction(() => {
      this.important = isImportant;
    });
  }

  @action
  setTaskIsChecked(isChecked: boolean, index: number): void {
    runInAction(() => {
      this.tasks?.forEach((item, i) => {
        if(i === index) item.isChecked = isChecked;
      });
    });
  }

  @action
  setTaskContent(content: string, index: number): void {
    runInAction(() => {
      this.tasks?.forEach((item, i) => {
        if(i === index) item.content = content;
      });
    });
  }
}

export const createTaskModal = new CreateTaskModalStore();