import * as React from "react";
import { Comment } from "../../../models/Comment";
import { CommentComponent } from "./CommentComponent";

interface PropsType {
  isLoading: boolean;
  comments: Comment[];
}

export function CommentsComponent(props: PropsType) {
  if (props.isLoading) {
    return <p>Loading...</p>;
  }

  if (props.comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  const commentsComponent = props.comments
    .filter((comment) => !!comment.by)
    .map((comment) => <CommentComponent key={comment.id} comment={comment} />);

  return <ul>{commentsComponent}</ul>;
}
