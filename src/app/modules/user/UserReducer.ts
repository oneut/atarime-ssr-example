import { reducerWithInitialState } from "typescript-fsa-reducers";
import { User } from "../../models/User";
import { actions } from "./UserAction";

const defaultUser = new User({
  id: "",
  karma: 0,
  created: 0
});

export const user = reducerWithInitialState<User>(defaultUser).case(
  actions.sync,
  (state, userAttributes) => {
    return new User(userAttributes);
  }
);
