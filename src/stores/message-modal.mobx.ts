import { action, autorun, makeObservable, observable } from "mobx";

class MessageModalStore {
	@observable isOpen: boolean = false;
	@observable message: string = "";

	constructor() {
		makeObservable(this);
	}

	@action
	setIsOpen(isOpen: boolean) {
		this.isOpen = isOpen;
	}

	@action
	setMessage(message: string) {
		this.message = message;
	}

	@action
	close() {
		this.setMessage("");
		this.setIsOpen(false);
	}
}

export const messageModal = new MessageModalStore();

autorun(() => {
	messageModal.isOpen && setTimeout(() => {
		messageModal.setIsOpen(false);
		messageModal.setMessage("");
	}, 3000);
});