import React from "react";
import { App } from "../../layout/App";
import { UserComponent } from "./components/UserComponent";
import { ModuleInterface } from "./configureModule";

interface PropsType {
  module: ModuleInterface;
}

export function Container(props: PropsType) {
  const user = props.module.hooks.useSelector((state) => state.user);
  return (
    <App>
      <UserComponent user={user} />
    </App>
  );
}
