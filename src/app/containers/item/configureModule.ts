import { combineReducers, createStore } from "redux";
import { createItemAction, ItemAction } from "../../modules/item/ItemAction";
import { Item } from "../../models/Item";
import { item } from "../../modules/item/ItemReducer";
import {
  CommentsAction,
  createCommentsAction
} from "../../modules/comment/CommentsAction";
import { Comment } from "../../models/Comment";
import { comments } from "../../modules/comment/CommentsReducer";
import { createReduxHooks, ReduxHooksInterface } from "../createReduxHooks";

export interface StateType {
  item: Item;
  comments: Comment[];
}

export interface ActionsInterface {
  item: ItemAction;
  comments: CommentsAction;
}

export interface ModuleInterface {
  actions: ActionsInterface;
  hooks: ReduxHooksInterface<StateType>;
}

const reducer = combineReducers({
  item,
  comments
});

export function configureModule(): ModuleInterface {
  const store = createStore(reducer);
  const actions: ActionsInterface = {
    item: createItemAction(store),
    comments: createCommentsAction(store)
  };
  const hooks = createReduxHooks<StateType>(store);

  return {
    actions,
    hooks
  };
}
