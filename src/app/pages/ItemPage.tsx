import { Page, Route } from "atarime";
import * as React from "react";
import NProgress from "nprogress";
import { ItemAttributesInterface } from "../attributes/ItemAttributes";
import { hackerNewsApi } from "../api/HackerNewsApi";
import {
  configureModule,
  ModuleInterface
} from "../containers/item/configureModule";
import { Container } from "../containers/item/Container";
import { NotFound } from "../layout/error/NotFound";

type RouteType = Route<{
  itemId: number;
}>;

interface InitialPropsType {
  item: ItemAttributesInterface;
}

export default class ItemPage extends Page<RouteType, InitialPropsType> {
  private module: ModuleInterface;

  public constructor(route: RouteType) {
    super(route);
    this.module = configureModule();
  }

  public initialPropsWillGet() {
    NProgress.start();
  }

  public async getInitialProps() {
    return {
      item: await hackerNewsApi.findItem(this.route.params.itemId)
    };
  }

  public initialPropsDidGet(initialProps: InitialPropsType) {
    NProgress.done();
  }

  public component(initialProps: InitialPropsType) {
    if (!initialProps.item) return <NotFound />;

    this.module.actions.item.sync(initialProps.item);
    return (
      <this.module.hooks.Provider>
        <Container module={this.module} />
      </this.module.hooks.Provider>
    );
  }
}
