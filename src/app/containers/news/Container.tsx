import * as React from "react";
import { App } from "../../layout/App";
import { ItemsComponent } from "./components/ItemsComponent";
import { ModuleInterface } from "./configureModule";

interface PropsType {
  module: ModuleInterface;
  page: number;
}

export function Container(props: PropsType) {
  const items = props.module.hooks.useSelector((state) => state.items);
  return (
    <App>
      <ItemsComponent
        actions={props.module.actions}
        items={items}
        page={props.page}
      />
    </App>
  );
}
