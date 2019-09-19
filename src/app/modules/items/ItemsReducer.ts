import { produce } from "immer";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Item } from "../../models/Item";
import { actions } from "./ItemsAction";

export const items = reducerWithInitialState<Item[]>([]).case(
  actions.sync,
  (state, itemsAttributes) => {
    return produce(state, (draft) => {
      return itemsAttributes.map((itemAttributes) => {
        return new Item(itemAttributes);
      });
    });
  }
);
