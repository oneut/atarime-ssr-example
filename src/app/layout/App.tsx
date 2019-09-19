import * as React from "react";
import { Header } from "./Header";

interface PropsType {
  children: React.ReactNode;
}

export function App(props: PropsType) {
  return (
    <div>
      <Header />
      <div className="container">{props.children}</div>
    </div>
  );
}
