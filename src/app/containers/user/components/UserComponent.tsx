import React from "react";
import { User } from "../../../models/User";

interface PropsType {
  user: User;
}

export function UserComponent(props: PropsType) {
  return (
    <div>
      <h3>User: {props.user.id}</h3>
      <p>created: {props.user.created}</p>
      <p>karma: {props.user.karma}</p>
    </div>
  );
}
