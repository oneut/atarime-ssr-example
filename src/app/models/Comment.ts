import * as timeago from "timeago.js";
import { CommentAttributesInterface } from "../attributes/CommentAttributes";

export class Comment {
  public readonly by: string;
  public readonly id: number;
  public readonly parent: number;
  public readonly text: string;
  public readonly time: number;
  public readonly type: string;
  public readonly kids: Comment[];

  public constructor(commentAttributes: CommentAttributesInterface) {
    this.by = commentAttributes.by;
    this.id = commentAttributes.id;
    this.parent = commentAttributes.parent;
    this.text = commentAttributes.text;
    this.time = commentAttributes.time;
    this.type = commentAttributes.type;
    this.kids = commentAttributes.kids.map((comment) => new Comment(comment));
  }

  public getTimeAgo() {
    return timeago.format(this.time);
  }
}
