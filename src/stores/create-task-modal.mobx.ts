import { TaskEntity, TaskType } from "dto/todo.dto";
import { action, makeObservable, observable } from "mobx";
import { user } from "./user.mobx";
import { api, authorizedUser } from "axios-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ModalType = 
  | "till from"
  | "subtasks"
  | "content";

class CreateTaskModalStore implements TaskEntity {
  date: string = `${new Date()
                        .toLocaleTimeString()
                        .split(':')[0]}:${
                    new Date()
                        .toLocaleTimeString()
                        .split(':')[0]}`;
  @observable isTillFromModalOpen: boolean = false;
  @observable isSubtasksModalOpen: boolean = false;
  @observable isContentModalOpen: boolean = false;
  @observable header: string = "";
  @observable content: string = "";
  @observable type: TaskType = "work";
  @observable creator: string = user.name;
  @observable till: string = this.date;
  @observable from: string = this.date;
  @observable important: boolean = false;
  @observable tasks: Array<{ isChecked: boolean, content: string }> = [];
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
  clear() {
    this.header = "";
    this.content = "";
    this.isTillFromModalOpen = false;
    this.isSubtasksModalOpen = false;
    this.isContentModalOpen = false;
    this.important = false;
    this.tasks = [];
  }

  @action
  close(type: ModalType): void {
    switch(type) {
      case "till from":
        this.isTillFromModalOpen = false;
        break;
      case "subtasks":
        this.isSubtasksModalOpen = false;
        break;
      case "content":
        this.isContentModalOpen = false;
        break;
    }
  }

  @action
  open(type: ModalType): void {
    switch(type) {
      case "till from":
        this.isTillFromModalOpen = true;
        break;
      case "subtasks":
        this.isSubtasksModalOpen = true;
        break;
      case "content":
        this.isContentModalOpen = true;
        break;
    }
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
    this.tasks.forEach((item, i) => {
      if(i === index) item.isChecked = isChecked;
    });
  }

  @action
  setTaskContent(content: string, index: number): void {
    this.tasks.forEach((item, i) => {
      if(i === index) item.content = content;
    });
  }

  @action
  addSubtask() {
    this.tasks.push({ isChecked: false, content: "" });
  }

  @action
  toTaskEntity(): TaskEntity {
    return {
      type: this.type,
      header: this.header,
      from: this.from,
      till: this.till,
      important: this.important,
      tasks: this.tasks,
      createdAt: this.createdAt
    }
  }

  @action
  async createTask() {
    try {
      if(!this.toTaskEntity().header.length) return;
      
      const response = await api.post('/user/add-task', {
        ...this.toTaskEntity()
      });

      console.log('response: ', response.data);
    }catch(error: unknown) {
      console.error(error);
      return;
    }
  }
}

export const createTaskModal = new CreateTaskModalStore();