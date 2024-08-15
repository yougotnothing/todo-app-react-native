import { action, makeObservable, observable } from "mobx";
import { user } from "./user.mobx";

class ChangeNameStore {
	@observable newName: string = "";

	constructor() {
		makeObservable(this);

		this.newName = user.name;
	}

	@action
	setNewName(newName: string) {
		this.newName = newName;
	}
}

export const changeName = new ChangeNameStore();