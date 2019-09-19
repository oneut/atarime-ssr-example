import { Store } from "redux";
import actionCreatorFactory from "typescript-fsa";
import { hackerNewsApi } from "../../api/HackerNewsApi";
import { ItemAttributesInterface } from "../../attributes/ItemAttributes";

const actionCreator = actionCreatorFactory();

export const actions = {
  sync: actionCreator<ItemAttributesInterface[]>("items/sync")
};

export class ItemsAction {
  private store: Store;

  public constructor(store: Store) {
    this.store = store;
  }

  public sync(itemsAttributes: ItemAttributesInterface[]) {
    this.store.dispatch(actions.sync(itemsAttributes));
  }

  public async fetch(params?: { page?: number }) {
    const page = params && params.page ? params.page : 1;
    const itemsAttributes = await hackerNewsApi.getTopStoryItems(page);
    this.sync(itemsAttributes);
  }
}

export function createItemsAction(store: Store) {
  return new ItemsAction(store);
}
