import { api } from "axios-config";
import { action, makeObservable, observable, runInAction } from "mobx";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

class ChangeAvatarStore {
  @observable avatar: string = "";
  @observable avatarBuffer: Blob | null = null;

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

    if(!result.canceled) await this.setAvatarBuffer(result.assets[0]);
  }

  @action
  async changeAvatarBuffer(image: string) {
    if(!image) return;

    const file = await FileSystem.readAsStringAsync(image, { encoding: FileSystem.EncodingType.Base64 });

    if(file.length > 0) runInAction(() => (this.avatarBuffer = new Blob([file], { type: 'image/jpeg' })));
  }

  @action
  async setAvatarBuffer(asset: ImagePicker.ImagePickerAsset) {
    try {
      await this.changeAvatarBuffer(asset.uri);
      this.setAvatar(asset.uri);
    }catch(error: unknown) {
      console.error("failed to set avatar buffer: ", error);
      return;
    }
  }

  @action
  async changeAvatar() {
    if(!this.avatarBuffer) return;
    try {
      const formData = new FormData();
      formData.append('avatar', this.avatarBuffer, 'avatar.jpg');
      await api.post('/user/change-avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    } catch(error: unknown) {
      console.error("failed to change avatar: ", error);
      return;
    }
  }
}

export const changeAvatar = new ChangeAvatarStore();