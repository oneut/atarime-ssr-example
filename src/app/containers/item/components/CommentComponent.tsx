import React from "react";
import { URL, Link } from "atarime";
import { Comment } from "../../../models/Comment";

interface PropsType {
  comment: Comment;
}

export function CommentComponent(props: PropsType) {
  const KidComponents = props.comment.kids
    .filter((kid) => !!kid.by)
    .map((kid) => <CommentComponent key={kid.id} comment={kid} />);

  return (
    <li>
      <dl>
        <dt>
          <ul className="list-inline">
            <li className="by">
              <Link to={URL.name("UserPage", { userId: props.comment.by })}>
                {props.comment.by}
              </Link>
            </li>
            <li className="time">{props.comment.getTimeAgo()}</li>
          </ul>
        </dt>
        <dd>
          <p dangerouslySetInnerHTML={{ __html: props.comment.text }} />
          <ul>{KidComponents}</ul>
        </dd>
      </dl>
    </li>
  );
}
