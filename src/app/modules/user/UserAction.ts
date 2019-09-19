import actionCreatorFactory from "typescript-fsa";
import { Store } from "redux";
import { UserAttributesInterface } from "../../attributes/UserAttributes";

const actionCreator = actionCreatorFactory();

export const actions = {
  sync: actionCreator<UserAttributesInterface>("user/sync")
};

export class UserAction {
  private readonly store: Store;
  public constructor(store: Store) {
    this.store = store;
  }

  public sync(userAttributes: UserAttributesInterface) {
    this.store.dispatch(actions.sync(userAttributes));
  }
}

export function createUserAction(store: Store) {
  return new UserAction(store);
}
