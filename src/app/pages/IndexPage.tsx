import NProgress from "nprogress";
import * as React from "react";
import { Page, Route } from "atarime";
import {
  configureModule,
  ModuleInterface
} from "../containers/index/configureModule";
import { ItemAttributesInterface } from "../attributes/ItemAttributes";
import { Container } from "../containers/index/Container";
import { hackerNewsApi } from "../api/HackerNewsApi";
import { NotFound } from "../layout/error/NotFound";

type RouteType = Route<{
  page: number;
}>;

interface InitialPropsType {
  items: ItemAttributesInterface[];
}

export default class IndexPage extends Page<RouteType, InitialPropsType> {
  private readonly module: ModuleInterface;

  public constructor(route: RouteType) {
    super(route);
    this.module = configureModule();
  }

  public initialPropsWillGet() {
    NProgress.start();
  }

  public async getInitialProps() {
    return {
      items: await hackerNewsApi.getTopStoryItems()
    };
  }

  public initialPropsDidGet(initialProps: InitialPropsType) {
    NProgress.done();
  }

  public component(initialProps: InitialPropsType) {
    if (initialProps.items.length === 0) return <NotFound />;

    this.module.actions.items.sync(initialProps.items);

    return (
      <this.module.hooks.Provider>
        <Container module={this.module} />
      </this.module.hooks.Provider>
    );
  }
}
