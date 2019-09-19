import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Item } from "../../models/Item";
import { action } from "./ItemAction";

const defaultItem = new Item({
  by: "",
  descendants: 0,
  id: 0,
  score: 0,
  time: 0,
  title: "",
  type: "",
  url: "",
  kids: null
});

export const item = reducerWithInitialState<Item>(defaultItem).case(
  action.sync,
  (state, itemAttributes) => {
    return new Item(itemAttributes);
  }
);
