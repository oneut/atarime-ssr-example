import * as React from "react";
import { App } from "../../layout/App";
import { ItemComponent } from "./components/ItemComponent";
import { ModuleInterface } from "./configureModule";

interface PropsType {
  module: ModuleInterface;
}

export function Container(props: PropsType) {
  const item = props.module.hooks.useSelector((state) => state.item);
  const comments = props.module.hooks.useSelector((state) => state.comments);
  return (
    <App>
      <ItemComponent
        actions={props.module.actions}
        item={item}
        comments={comments}
      />
    </App>
  );
}
