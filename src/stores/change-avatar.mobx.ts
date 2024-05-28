import { action, makeObservable, observable } from "mobx";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { api } from "axios-config";
import { user } from "./user.mobx";

class ChangeAvatarStore {
  @observable avatar: string = "";
  @observable avatarFile: File | null = null;

  constructor() {
    makeObservable(this);
  }

  @action
  setAvatar(uri: string) {
    this.avatar = uri;
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

    if(!result.canceled) await this.setAvatarFile(result.assets[0]);
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
        
        this.avatarFile = file as unknown as File;
        this.setAvatar(fileUri);
      }
    }catch(error: unknown) {
      console.error("failed to set avatar file: ", error);
      return;
    }
  }

  @action
  async changeAvatar() {
    if(!this.avatarFile) return;

    try {
      const formData = new FormData();
      formData.append('avatar', {
        uri: this.avatar,
        name: 'avatar.jpg',
        type: 'image/jpeg'
      }as unknown as Blob);

      await api.post('/user/change-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }catch(error: unknown) {
      console.error("failed to change avatar: ", error);
      return;
    }
  }
}

export const changeAvatar = new ChangeAvatarStore();
