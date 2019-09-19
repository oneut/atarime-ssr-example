import { reducerWithInitialState } from "typescript-fsa-reducers";
import { produce } from "immer";
import { Comment } from "../../models/Comment";
import { action } from "./CommentsAction";

export const comments = reducerWithInitialState<Comment[]>([]).case(
  action.sync,
  (state, commentsAttributes) => {
    return produce(state, (draft) => {
      return commentsAttributes.map((commentAttribute) => {
        return new Comment(commentAttribute);
      });
    });
  }
);
