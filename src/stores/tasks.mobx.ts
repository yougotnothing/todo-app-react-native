import { api } from "axios-config";
import { TaskEntity, TaskType, UserTasks, Tasks } from "dto/todo";
import { action, observable } from "mobx";
import { DATE_CONFIG } from "src/config/date.config";

class TasksStore {
  @observable tasks: Tasks = {
    "today": [],
    "week": [],
    "month": [],
  }
  @observable userTasks: UserTasks = {
    "school": [],
    "work": [],
    "shop": [],
    "read": [],
    "work out": [],
    "important": [],
  }
  @observable tasksLength: Record<TaskType, number> = {
    "school": 0,
    "work": 0,
    "shop": 0,
    "read": 0,
    "work out": 0,
    "important": 0,
  }

  @action
  async getTasksLength() {
    try {
      const response = await api.get('/tasks/tasks-length');

      this.tasksLength = response.data.tasks;
    }catch(error: any) {
      console.error(error.response.data);
      return;
    }
  }

  @action
  async getImportantTasks() {
    try {
      const response = await api.get('/tasks/important-tasks');

      this.userTasks["important"] = response.data.tasks;
    }catch(error: any) {
      console.error(error.response.data);
      return;
    }
  }

  @action
  async getTasksByType(type: TaskType) {
    try {
      const response = await api.get('/tasks/tasks-by-type', { 
        params: {
          type: encodeURIComponent(type)
        }
      });
      
      this.userTasks[type] = response.data.tasks;
    }catch(error: any) {
      console.error(error.response.data);
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
  async deleteTask(id: number, type: keyof UserTasks) {
    try {
      await api.delete('tasks/delete-task', {
        params: {
          id
        },
      });

      console.log('deleted');
      this.userTasks[type] = this.userTasks[type].filter(item => item.id !== id);
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
  async getTasks(type: "today" | "week" | "month") {
    const date = new Date().toLocaleDateString('en-US', DATE_CONFIG);

    try {
      switch(type) {
        case "today":
          await this.getTodayTasks();
          break;
        case "week":
          const week = await api.get('/tasks/week-tasks', {
            params: {
              week: `${date.split(', ')[1]}, ${date.split(', ')[2]}`
            }
          });

          this.tasks["week"] = week.data.tasks;
          break;
        case "month":
          const month = await api.get('/tasks/month-tasks', {
            params: {
              month: date
                      .split(', ')
                      .join(' ')
                      .split(' ')[1]
            }
          });

          this.tasks["month"] = month.data.tasks;
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
      const response = await api.get('/tasks/today-tasks', {
        params: {
          createdAt: new Date().toLocaleDateString('en-US', DATE_CONFIG)
        }
      });

      this.tasks["today"] = response.data.tasks;
    }catch(error: unknown) {
      console.error(error);
      return;
    }
  }
}

export const tasks = new TasksStore();