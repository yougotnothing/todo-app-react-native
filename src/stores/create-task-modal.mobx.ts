import { TaskEntity, TaskType, TodoDto } from "dto/todo";
import { action, makeObservable, observable } from "mobx";
import { user } from "./user.mobx";
import { api } from "axios-config";
import { DATE_CONFIG } from "@config/date";

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
                        .split(':')[1]}`;
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
  @observable createdAt: string = new Date().toLocaleDateString('en-US', DATE_CONFIG);
  @observable modalHeader: string = "Add a new task";

  constructor() {
    makeObservable(this);
  }

  @action setModalHeader(header: string) {
    this.modalHeader = header;
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
        this.clear();
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
  async createTask(): Promise<{ status: number } | void> {
    try {
      if(!this.toTaskEntity().header.length) return;
      
      const response = await api.post('/tasks/create-task', {
        task: { ...this.toTaskEntity() },
        name: user.name
      });

      console.log('response: ', response.data);
      return { status: response.status };
    }catch(error: any) {
      console.error(error);
      return { status: error.response.status };
    }
  }

  @action
  setSubtasks(tasks: Array<{ isChecked: boolean, content: string }>) {
    this.tasks = tasks;
  }

  @action
  setTask(task: TodoDto) {
    this.setModalHeader("Edit task")
    this.setSubtasks(task.tasks);
    this.setHeader(task.header);
    this.setContent(task.content);
    this.setType(task.type);
    this.setTill(task.till);
    this.setFrom(task.from);
    this.setImportant(task.important);
  }
}

export const createTaskModal = new CreateTaskModalStore();