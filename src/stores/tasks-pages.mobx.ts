import { api, authorizedUser } from "axios-config";
import { TodoDto } from "dto/todo.dto";
import { action, observable } from "mobx";

type TasksPagesStoreType = "Today" | "Week" | "Month" | "Daily";

class TasksPagesStore {
  @observable type: TasksPagesStoreType = "Daily";
  @observable tasks: TodoDto[] = [];

  @action
  async getTasksByType(type: TasksPagesStoreType) {
    try {
      const response = await api.get(`/tasks/get-tasks-by`, {
        ...await authorizedUser(),
        params: {
          type
        }
      });

      this.tasks = response.data.tasks;
      console.log(`${type} tasks: `, response.data.tasks);
    }catch(error: unknown) {
      console.error(error);
      return;
    }
  }

  @action
  setType(type: TasksPagesStoreType) {
    this.type = type;
  }
}

export const tasksPages = new TasksPagesStore();