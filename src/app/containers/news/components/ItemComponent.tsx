import * as React from "react";
import { Link, URL } from "atarime";
import { Item } from "../../../models/Item";

interface PropsType {
  item: Item;
}

export function ItemComponent(props: PropsType) {
  return (
    <li className="mb-3">
      <h3 className="title">
        <a href={props.item.getUrl()}>{props.item.title}</a>
      </h3>
      <div>
        <ul className="list-inline">
          <li className="list-inline-item score">{props.item.score} points</li>
          <li className="list-inline-item by">
            by{" "}
            <Link to={URL.name("UserPage", { userId: props.item.by })}>
              {props.item.by}
            </Link>
          </li>
          <li className="list-inline-item time">{props.item.getTimeAgo()}</li>
          <li className="list-inline-item comments-link">
            <Link to={URL.name("ItemPage", { itemId: props.item.id })}>
              {props.item.descendants} comments
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
}
