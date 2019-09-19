import { Page, Route } from "atarime";
import NProgress from "nprogress";
import * as React from "react";
import { hackerNewsApi } from "../api/HackerNewsApi";
import { UserAttributesInterface } from "../attributes/UserAttributes";
import {
  configureModule,
  ModuleInterface
} from "../containers/user/configureModule";
import { Container } from "../containers/user/Container";

type RouteType = Route<{
  userId: number;
}>;

interface InitialPropsType {
  user: UserAttributesInterface;
}

export default class UserPage extends Page<RouteType, InitialPropsType> {
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
      user: await hackerNewsApi.findUser(this.route.params.userId)
    };
  }

  public initialPropsDidGet() {
    NProgress.done();
  }

  public component(initialProps: InitialPropsType) {
    this.module.actions.user.sync(initialProps.user);
    return (
      <this.module.hooks.Provider>
        <Container module={this.module} />
      </this.module.hooks.Provider>
    );
  }
}
