import { api } from "axios-config";
import { action, makeObservable, observable } from "mobx";
import { user } from "./user.mobx";

class ForgotPasswordStore {
	@observable isFetching: boolean = false;
	@observable isDisabled: boolean = false;
	@observable message: string = "";

	constructor() {
		makeObservable(this);
	}

	@action
	setIsDisabled(isDisabled: boolean) {
		this.isDisabled = isDisabled;
	}

	@action
	setIsFetching(isFetching: boolean) {
		this.isFetching = isFetching;
	}

	@action
	setMessage(message: string) {
		this.message = message;
	}

	async sendEmailVerification() {
		try {
			this.setIsFetching(true);
			this.setIsDisabled(true);
			
			if(!user.id) this.setMessage("user invalid");

			const response = await api.post("/mail/send-restore-password-email-message",
				{
					id: user.id
				}
			);

			this.setMessage(response.data.message);
			this.setIsFetching(false);
		}catch(error: any) {
			this.setMessage(error.response.data.message);
			this.setIsFetching(false);

			return;
		}
	}
}

export const forgotPassword = new ForgotPasswordStore();