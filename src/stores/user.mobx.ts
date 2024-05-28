import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, authorizedUser } from "axios-config";
import { LoginDto } from "dto/login.dto";
import { UserDto } from "dto/user.dto";
import { action, makeObservable, observable, runInAction } from "mobx";

class UserStore implements UserDto {
  @observable name: string = "";
  @observable email: string = "";
  @observable avatar: string = "";
  @observable isHaveAvatar: boolean = false;
  @observable id: number = 0;
  @observable isLoggedIn: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action
  setUser(user: UserDto) {
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar;
    this.isHaveAvatar = user.isHaveAvatar;
    this.id = user.id;
    this.isLoggedIn = true;
  }

  @action
  async login(dto: LoginDto) {
    try {
      const response = await api.post('/auth/login', {
        ...dto
      });

      await AsyncStorage.setItem('token', response.data.token);
      await this.getUser();
      console.log("User logged in");
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  @action
  async getUser() {
    try {
      const response = await api.get('/user/get-user');

      this.setUser(response.data.user);
    }catch(error: any) {
      console.error(error);
      return;
    }
  }

  @action
  async changeAvatar(avatar: Blob) {
    try {
      await api.put('/user/change-avatar', {
        ...await authorizedUser(),
        avatar
      });

      this.getUser();
    }catch(error: unknown) {
      console.error(error);
      return;
    }
  }

  @action
  async changeName(name: string) {
    try {
      await api.patch('/user/change-name', {
        ...await authorizedUser(),
        name
      });

      await this.getUser();
      console.log(`name changed to ${name}!`);
    }catch(error: unknown) {
      console.error(error);
      return;
    }
  }

  @action
  async logout() {
    await AsyncStorage.removeItem('token');

    runInAction(() => {
      this.name = "";
      this.email = "";
      this.avatar = "";
      this.isHaveAvatar = false;
      this.id = 0;
      this.isLoggedIn = false;
    });
  }
}

export const user = new UserStore();