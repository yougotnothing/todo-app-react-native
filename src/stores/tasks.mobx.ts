import { api } from "axios-config";
import { TaskEntity, TaskType, UserTasks, Tasks, TodoDto } from "dto/todo";
import { action, makeObservable, observable } from "mobx";
import { DATE_CONFIG } from "src/config/date.config";

class TasksStore {
  @observable tasks: Tasks= {
    "today": [],
    "week": [],
    "month": [],
    "done": []
  }
  @observable userTasks: UserTasks = {
    "school": [],
    "work": [],
    "shop": [],
    "read": [],
    "work out": [],
    "important": []
  }
  @observable tasksLength: Record<TaskType, number> = {
    "school": 0,
    "work": 0,
    "shop": 0,
    "read": 0,
    "work out": 0,
    "important": 0
  }

  constructor() {
    makeObservable(this);
  }

  @action
  setTasks(type: keyof Tasks, tasks: TodoDto[]) {
    this.tasks[type] = tasks;
  }

  @action
  setUserTasks(type: keyof UserTasks, tasks: TodoDto[]) {
    this.userTasks[type] = tasks;
  }

  @action
  setTasksLength(tasksLength: Record<TaskType, number>) {
    this.tasksLength = tasksLength;
  }

  @action
  async getTasksLength() {
    try {
      const response = await api.get('/tasks/tasks-length');

      this.setTasksLength(response.data.tasks);
    }catch(error: any) {
      console.error(error.response.data);
      return;
    }
  }

  @action
  async getImportantTasks() {
    try {
      const response = await api.get('/tasks/important-tasks');

      this.setUserTasks("important", response.data.tasks);
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
      
      this.setUserTasks(type, response.data.tasks);
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
  async getTasks(type: keyof Tasks) {
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

          this.setTasks("week", week.data.tasks);
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

          this.setTasks("month", month.data.tasks);
          break;
        case "done":
          const done = await api.get('/tasks/done-tasks');

          this.setTasks("done", done.data.tasks);
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

      this.setTasks("today", response.data.tasks);
    }catch(error: unknown) {
      console.error(error);
      return;
    }
  }

  @action
  async changeTaskIsChecked(
    task: TodoDto,
    isChecked: boolean,
    page: keyof Tasks | keyof UserTasks
  ) {
    try {
      await api.patch('/tasks/check', {
        params: {
          id: task.id,
        },
        isChecked
      });

      switch(page) {
        case "today":
        case "week": 
        case "month":
        case "done":
          this.tasks[page].map(
            item => item.id === task.id ? item.isChecked = isChecked : item
          );
          break;
        case 'school':
        case 'work':
        case 'shop':
        case 'read':
        case 'work out':
        case 'important':
          this.userTasks[page].map(
            item => item.id === task.id ? item.isChecked = isChecked : item
          );
          break;
      }
    }catch(error: any) {
      console.error(error.response.data.message);
      return;
    }
  }
}

export const tasks = new TasksStore();