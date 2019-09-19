import actionCreatorFactory from "typescript-fsa";
import { Store } from "redux";
import { CommentAttributesInterface } from "../../attributes/CommentAttributes";
import { hackerNewsApi } from "../../api/HackerNewsApi";

const actionCreator = actionCreatorFactory();

export const action = {
  sync: actionCreator<CommentAttributesInterface[]>("comments/sync"),
  fetch: actionCreator<number>("comments/fetch")
};

export class CommentsAction {
  private readonly store: Store;
  public constructor(store: Store) {
    this.store = store;
  }

  public sync(commentsAttributes: CommentAttributesInterface[]) {
    this.store.dispatch(action.sync(commentsAttributes));
  }

  public async fetch(kids: number[]) {
    const commentsAttributes = await hackerNewsApi.getComments(kids);
    this.sync(commentsAttributes);
  }
}

export function createCommentsAction(store: Store) {
  return new CommentsAction(store);
}
