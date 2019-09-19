import * as React from "react";
import { hydrate } from "react-dom";
import { SSR } from "atarime";
import { setRoute } from "./routes";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import "nprogress/nprogress.css";

// Create route object.
const router = SSR.createRouter();

// Set route.
setRoute(router);

const initialPropsElement = document.getElementById("initial-props");
if (!initialPropsElement) throw Error("`initialProps` is not exists.");

// Render.
router.runWithInitialProps(
  JSON.parse(initialPropsElement.innerText),
  (Root) => {
    hydrate(<Root />, document.getElementById("app"));
  }
);

if (module.hot) {
  module.hot.accept("./routes", () => {
    const setRoute = require("./routes").setRoute;

    const router = SSR.createRouter();

    // Set route.
    setRoute(router);

    // Render.
    router.runWithInitialProps(
      JSON.parse(initialPropsElement.innerText),
      (Root) => {
        hydrate(<Root />, document.getElementById("app"));
      }
    );
  });
}
