import { action, observable, autorun, makeObservable, computed } from "mobx";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { api } from "axios-config";
import { user } from "@store/user";
import { DATE_CONFIG } from "@config/date";

class ChangeAvatarStore {
  @observable avatar: string = user.avatar;
  @observable avatarFile: File | null = null;
  @observable isFetching: boolean = false;

  constructor() {
    makeObservable(this);

    autorun(() => (
      this.setAvatar(`${process.env.API_URL}/user/get-avatar?id=${user.id}&time=${new Date().toLocaleDateString('en-US', DATE_CONFIG)}`)
    ));
  }

  @computed
  get avatarUrl() {
    return `${process.env.API_URL}/user/get-avatar?id=${user.id}&time=${new Date().toLocaleDateString('en-US', DATE_CONFIG)}`;
  }

  @action
  setAvatar(uri: string) {
    this.avatar = uri;
  }

  @action
  setIsFetching(isFetching: boolean) {
    this.isFetching = isFetching;
  }

  @action
  async pickAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
      base64: true
    });

    if(!result.canceled) {
      this.setIsFetching(true);
      await this.setAvatarFile(result.assets[0]);
      const response = await this.changeAvatar();
      this.setAvatar(result.assets[0].uri);
      this.setIsFetching(false);

      return response.message;
    };

    return "no avatar found";
  }

  @action
  private _setAvatarFile(file: { uri: string, name: string, type: string }) {
    this.avatarFile = file as unknown as File;
  }

  @action
  async setAvatarFile(asset: ImagePicker.ImagePickerAsset) {
    try {
      const fileUri = asset.uri;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      
      if(fileInfo.exists) {
        const file = {
          uri: fileUri,
          name: 'avatar.jpg',
          type: 'image/jpeg'
        };
        
        this.setAvatar(fileUri);
        this._setAvatarFile(file);
      }
    }catch(error: unknown) {
      console.error("failed to set avatar file: ", error);
      return;
    }
  }

  @action
  async changeAvatar(): Promise<{ message: string }> {
    if(!this.avatarFile) return { message: "no avatar found" };

    try {
      this.setIsFetching(true);

      const formData = new FormData();

      formData.append('avatar', {
        uri: this.avatar,
        name: 'avatar.jpg',
        type: 'image/jpeg'
      } as unknown as Blob);

      const response = await api.post('/user/change-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      this.setIsFetching(false);

      return response.data;
    }catch(error: any) {
      this.setIsFetching(false);
      console.error("failed to change avatar: ", error);
      return error.response.data;
    }
  }
}

export const changeAvatar = new ChangeAvatarStore();
