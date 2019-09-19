import { combineReducers, createStore } from "redux";
import { Item } from "../../models/Item";
import {
  createItemsAction,
  ItemsAction
} from "../../modules/items/ItemsAction";
import { items } from "../../modules/items/ItemsReducer";
import { createReduxHooks, ReduxHooksInterface } from "../createReduxHooks";

export interface StateType {
  items: Item[];
}

export interface ActionsInterface {
  items: ItemsAction;
}

export interface ModuleInterface {
  actions: ActionsInterface;
  hooks: ReduxHooksInterface<StateType>;
}

const reducer = combineReducers({
  items
});

export function configureModule(): ModuleInterface {
  const store = createStore(reducer);
  const actions = {
    items: createItemsAction(store)
  };
  const hooks = createReduxHooks<StateType>(store);

  return {
    actions,
    hooks
  };
}
