import actionCreatorFactory from "typescript-fsa";
import { Store } from "redux";
import { ItemAttributesInterface } from "../../attributes/ItemAttributes";

const actionCreator = actionCreatorFactory();

export const action = {
  sync: actionCreator<ItemAttributesInterface>("item/sync")
};

export class ItemAction {
  private store: Store;

  public constructor(store: Store) {
    this.store = store;
  }

  public sync(itemAttributes: ItemAttributesInterface) {
    this.store.dispatch(action.sync(itemAttributes));
  }
}

export function createItemAction(store: Store) {
  return new ItemAction(store);
}
