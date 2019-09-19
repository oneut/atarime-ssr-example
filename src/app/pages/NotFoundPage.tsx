import { Page, Route } from "atarime";
import NProgress from "nprogress";
import * as React from "react";
import { App } from "../layout/App";
import { NotFound } from "../layout/error/NotFound";

type RouteType = Route<{}>;

export default class NotFoundPage extends Page<RouteType, {}> {
  public static initialPropsWillGet() {
    NProgress.start();
  }

  public static initialPropsDidGet() {
    NProgress.done();
  }

  public component() {
    return (
      <App>
        <NotFound />
      </App>
    );
  }
}
