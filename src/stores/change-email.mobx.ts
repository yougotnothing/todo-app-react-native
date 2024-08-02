import { api } from "axios-config";
import { action, makeObservable, observable } from "mobx";
import { user } from "./user.mobx";

class ChangeEmailStore {
  @observable newEmail: string = user.email.length ? user.email : "";
  @observable isFetching: boolean = false;
	@observable isValid: boolean = false;

  constructor() {
    makeObservable(this);
  }

	@action
	setIsValid(isValid: boolean) {
		this.isValid = isValid;
	}

  @action
  setNewEmail(newEmail: string) {
		const regexp = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

		if(!regexp.test(newEmail)) this.setIsValid(false);
		else if(newEmail === user.email) this.setIsValid(false);
		else this.setIsValid(true);

    this.newEmail = newEmail;
  }

  @action
  setIsFetching(isFetching: boolean) {
    this.isFetching = isFetching;
  }

  async changeEmail(newEmail: string) {
    try {
      const response = await api.patch("/user/change-email", {
        newEmail,
      });

      console.log("response: ", response.data);

      await user.getUser();
    } catch (error: any) {
      console.error(error.response.data.message);
      return;
    }
  }
}

export const changeEmail = new ChangeEmailStore();