import { api, authorizedUser } from "axios-config";
import { TaskEntity, TaskType, TodoDto, UserTasks,  } from "dto/todo.dto";
import { action, observable } from "mobx";

class TasksStore {
  @observable todayTasks: Array<TodoDto> = [];
  @observable todos: UserTasks = {
    "school": [],
    "work": [],
    "shop": [],
    "read": [],
    "work out": []
  };

  @action
  async getTasksByType(type: TaskType) {
    try {
      const response = await api.get('/tasks/get-tasks-by-type', {
        ...await authorizedUser(),
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
        ...await authorizedUser(),
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
        ...await authorizedUser()
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
        ...await authorizedUser(),
        ...task
      });

      console.log('task added');
    }catch(error: unknown) {
      console.error(error);
      return;
    }
  }

  @action
  async getTodayTasks(data: { createdAt: string }) {
    try {
      const response = await api.get('/tasks/get-today-tasks', {
        ...await authorizedUser(),
        params: {
          ...data
        }
      });

      this.todayTasks = response.data.tasks;
    }catch(error: unknown) {
      console.error(error);
      return;
    }
  }
}

export const tasks = new TasksStore();
