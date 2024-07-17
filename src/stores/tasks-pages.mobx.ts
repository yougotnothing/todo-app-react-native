import { api } from "axios-config";
import { TaskType, TodoDto } from "dto/todo";
import { action, observable } from "mobx";
import { tasks } from "./tasks.mobx";

type Pages = DailyPages | TaskType;
type DailyPages = 
  | "Today"
  | "Week"
  | "Month"
  | "Daily";

class TasksPagesStore {
  @observable type: Pages = "Daily";
  @observable tasks: TodoDto[] = [];

  @action
  async getTasksByType(type: Pages) {
    try {
      if(type !== "Daily" && type !== "Month" && type !== "Week" && type !== "Today") {
        tasks.getTasksByType(type.toLowerCase() as TaskType);
        return;
      };

      const response = await api.get(`/tasks/get-tasks-by`, {
        params: {
          type
        }
      });

      this.tasks = response.data.tasks;
      console.log(`${type} tasks: `, response.data.tasks);
    }catch(error: any) {
      console.error(error.response.data);
      return;
    }
  }

  @action
  setType(type: Pages) {
    this.type = type;
  }
}

export const tasksPages = new TasksPagesStore();