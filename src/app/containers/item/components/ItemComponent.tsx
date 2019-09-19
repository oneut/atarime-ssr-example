import * as React from "react";
import { URL, Link } from "atarime";
import { ActionsInterface } from "../configureModule";
import { Item } from "../../../models/Item";
import { Comment } from "../../../models/Comment";
import { CommentsComponent } from "./CommentsComponent";

interface PropsType {
  actions: ActionsInterface;
  item: Item;
  comments: Comment[];
}

export function ItemComponent(props: PropsType) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    props.actions.comments.fetch(props.item.kids).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="news-item">
        <h3 className="title">
          <a href={props.item.getUrl()}>{props.item.title}</a>
        </h3>
        <div>
          <ul className="list-inline">
            <li className="list-inline-item score">
              {props.item.score} points
            </li>
            <li className="list-inline-item by">
              by{" "}
              <Link
                to={URL.name("UserPage", { userId: props.item.by })}
                className=""
              >
                {props.item.by}
              </Link>
            </li>
            <li className="list-inline-item time">{props.item.getTimeAgo()}</li>
          </ul>
        </div>
      </div>
      <div>
        <h4>
          Comment{" "}
          {isLoading && (
            <span>
              <i className="fa fa-refresh fa-spin fa-fw" />
            </span>
          )}
        </h4>
        <CommentsComponent isLoading={isLoading} comments={props.comments} />
      </div>
    </div>
  );
}
