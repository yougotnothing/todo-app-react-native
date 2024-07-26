import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "axios-config";
import { ChangePasswordDto } from "dto/change-password";
import { LoginDto } from "dto/login";
import { UserDto } from "dto/user";
import { action, makeObservable, observable, runInAction } from "mobx";
import { DATE_CONFIG } from "@config/date";
import { UUID } from "@interfaces/uuid";

class UserStore implements UserDto {
  @observable name: string = "";
  @observable email: string = "";
  @observable avatar: string = "";
  @observable isHaveAvatar: boolean = false;
  @observable id: UUID | null = null;
  @observable isLoggedIn: boolean = false;
  @observable sessionID: string | null = null;
  @observable isVerified: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action
  setUser(user: UserDto) {
    this.name = user.name;
    this.email = user.email;
    this.avatar = `${user.avatar}&time=${new Date()}`;
    this.isHaveAvatar = user.isHaveAvatar;
    this.id = user.id;
    this.sessionID = user.sessionID;
    this.isLoggedIn = true;
    this.isVerified = user.isVerified;
  }

  @action
  setSessionID(sessionID: string | null) {
    this.sessionID = sessionID;
  }

  @action
  async login(dto: LoginDto): Promise<{ isLoggedSuccess: boolean }> {
    try {
      const response = await api.post('/auth/login', {
        ...dto
      });

      if(response.status !== 200) return { isLoggedSuccess: false };
      runInAction(() => (this.sessionID = response.data.session as string));
      await AsyncStorage.setItem('token', response.data.session as string);

      await this.getUser();

      return { isLoggedSuccess: true };

    }catch(error: any) {
      console.error(error);
      return { isLoggedSuccess: false };
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
  async changePassword(dto: ChangePasswordDto) {
    try {
      const response = await api.patch('/user/change-password', {
        ...dto,
      });

      await AsyncStorage.setItem('token', response.data.token);
      await this.getUser();
      
    }catch(error: any) {
      console.error(error.response.data);
      return;
    }
  }

  @action
  async updateAvatar() {
    const date = new Date().toLocaleDateString('en-US', DATE_CONFIG);
    this.avatar = `${process.env.API_URL}/user/get-avatar?id=${this.id}&time=${date}`;
  }

  @action
  async changeAvatar(avatar: Blob) {
    try {
      await api.put('/user/change-avatar', {
        avatar
      });

      await this.getUser();
    }catch(error: any) {
      console.error(error.response.data.message);
      return;
    }
  }

  @action
  async changeName(name: string) {
    try {
      const response = await api.patch('/user/change-name', {
        newName: name
      });

      console.log(response.data);

      await this.getUser();
    }catch(error: any) {
      console.error(error.response.data);
      return;
    }
  }

  @action
  async getAvatar() {
    try {
      await api.get('/user/get-avatar', {
        params: {
          id: this.id,
          time: new Date().toLocaleDateString('en-US', DATE_CONFIG)
        }
      });
    }catch(error: any) {
      console.error("error handling avatar: ", error.response.data);
      return;
    }
  }

  @action
  async logout(clearToken: "clear" | "keep" = "clear") {
    await api.post('/auth/logout');

    if(clearToken === "clear") await AsyncStorage.removeItem('token');

    runInAction(() => {
      this.name = "";
      this.email = "";
      this.avatar = "";
      this.isHaveAvatar = false;
      this.id = null;
      if(clearToken === "clear") {
        this.isLoggedIn = false;
      }
    });
  }

  async sendEmailVerification() {
    try {
      await api.post('/mail/send-verify-email-message');
    }catch(error: any) {
      console.error(error.response.data.message);
      return;
    }
  }
}

export const user = new UserStore();