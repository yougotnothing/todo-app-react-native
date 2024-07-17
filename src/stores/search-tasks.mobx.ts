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
  async getTasksBySubstring(substring: string) {
    try {
      const response = await api.get('/tasks/tasks-by-substring', {
        params: {
          substring
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