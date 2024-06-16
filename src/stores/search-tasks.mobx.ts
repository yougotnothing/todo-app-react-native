import { api } from "axios-config";
import { TodoDto } from "dto/todo";
import { action, makeObservable, observable, runInAction } from "mobx";

class SearchTasks {
  @observable tasks: TodoDto[] = [];
  @observable value: string = "";
  @observable isFocused: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action
  setIsFocused(isFocused: boolean) {
    console.log('isFocused: ', isFocused);
    this.isFocused = isFocused;
  }

  @action
  setValue(value: string) {
    this.value = value;
  }

  @action
  setTasks(tasks: TodoDto[]) {
    this.tasks = tasks;
  }

  @action
  async getTasksBySubstring() {
    try {
      const response = await api.get('/tasks/get-tasks-by-substring', {
        params: {
          substring: this.value
        }
      });

      console.log('response: ', response.data);

      this.setTasks(response.data.tasks);
    }catch(error: any) {
      console.error(error.response.data);
      return;
    }
  }
}

export const searchTasks = new SearchTasks();