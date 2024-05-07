import { api } from "axios-config";
import { TaskEntity, TaskType, TodoDto, UserTasks,  } from "dto/todo.dto";
import { action, makeObservable, observable, runInAction } from "mobx";
import { DATE_CONFIG } from "src/config/date.config";

class TasksStore {
  @observable todayTasks: Array<TodoDto> = [];
  @observable todos: UserTasks = {
    "school": [],
    "work": [],
    "shop": [],
    "read": [],
    "work out": [],
  };

  constructor() {
    makeObservable(this);
  }

  @action
  async getTasksByType(type: TaskType) {
    try {
      const response = await api.get('/tasks/get-tasks-by-type', {
        params: {
          type
        }
      });
      
      this.todos[type] = response.data.tasks;
      }catch(error: unknown) {
        console.error(error);
        return;
      }
    }

  @action
  async changeHeader(data: { header: string, id: number }, type: TaskType) {
    try {
      await api.patch('/tasks/change-header', {
        ...data
      });

      this.getTasksByType(type);
      console.log('header changed');
    }catch(error: unknown) {
      console.error(error);
      return;
    }
  }

  @action
  async deleteTask(id: number) {
    try {
      await api.delete('tasks/delete-task', {
        params: { id },
      });

      console.log('deleted');
      this.todos.school = this.todos.school.filter(item => item.id !== id);
    }catch(error: unknown) {
      console.error(error);
      return;
    }
  }

  @action
  async addTask(task: TaskEntity) {
    try {
      await api.post('/tasks/add-task', {
        ...task
      });

      console.log('task added');
    }catch(error: unknown) {
      console.error(error);
      return;
    }
  }

  @action
  async getTasks(type: "today" | "week" | "month", data: string = new Date().toLocaleDateString('en-US', DATE_CONFIG)) {
    try {
      switch(type) {
        case "today":
          await this.getTodayTasks();
          break;
        case "week":
          const week = await api.get('/tasks/week-tasks', {
            params: {
              week: data && data
            }
          });

          runInAction(() => this.todayTasks = week.data.tasks);
          break;
        case "month":
          const month = await api.get('/tasks/month-tasks', {
            params: {
              month: data && data
            }
          });

          runInAction(() => this.todayTasks = month.data.tasks);
          break;
      }
    }catch(error: unknown) {
      console.error(error);
      return;
    }
  }

  @action
  async getTodayTasks() {
    try {
      const params = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const response = await api.get('/tasks/today-tasks', {
        params: {
          createdAt: new Date().toLocaleDateString('en-US', params as Intl.DateTimeFormatOptions)
        }
      });

      runInAction(() => this.todayTasks = response.data.tasks);
    }catch(error: unknown) {
      console.error(error);
      return;
    }
  }
}

export const tasks = new TasksStore();