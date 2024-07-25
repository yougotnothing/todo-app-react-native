import { ChangePasswordDto } from "dto/change-password";
import { action, observable } from "mobx";

class ChangePasswordStore {
  @observable oldPassword: string = '';
  @observable newPassword: string = '';
  @observable confirmNewPassword: string = '';
  @observable isFetching: boolean = false;

  @action
  setFieldValue(field: 'oldPassword' | 'newPassword' | 'confirmNewPassword', value: string) {
    this[field] = value;
  }

  @action
  toPasswordDto(): ChangePasswordDto {
    return {
      password: this.newPassword,
      confirmPassword: this.newPassword
    }
  }

  @action
  clearFields(field: 'oldPassword' | 'newPassword' | 'confirmNewPassword' | null = null) {
    if(!field) {
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmNewPassword = '';
    }else{
      this[field] = '';
    }
  }
}

export const changePassword = new ChangePasswordStore();