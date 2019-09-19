import { combineReducers, createStore } from "redux";
import { User } from "../../models/User";
import { createUserAction, UserAction } from "../../modules/user/UserAction";
import { createReduxHooks, ReduxHooksInterface } from "../createReduxHooks";
import { user } from "../../modules/user/UserReducer";

export interface StateType {
  user: User;
}

export interface ActionsInterface {
  user: UserAction;
}

export interface ModuleInterface {
  actions: ActionsInterface;
  hooks: ReduxHooksInterface<StateType>;
}

const reducer = combineReducers({
  user
});

export function configureModule(): ModuleInterface {
  const store = createStore(reducer);
  const actions = {
    user: createUserAction(store)
  };
  const hooks = createReduxHooks<StateType>(store);

  return {
    actions,
    hooks
  };
}
