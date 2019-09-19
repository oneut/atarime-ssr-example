import * as React from "react";
import { App } from "../../layout/App";
import { ModuleInterface } from "./configureModule";
import { ItemsComponent } from "./components/ItemsComponent";

interface PropsType {
  module: ModuleInterface;
}

export function Container(props: PropsType) {
  const items = props.module.hooks.useSelector((state) => state.items);
  return (
    <App>
      <ItemsComponent items={items} actions={props.module.actions} />
    </App>
  );
}
