/* eslint-disable @typescript-eslint/no-var-requires */
import path from "path";
import http from "http";
import domain from "domain";
import ejs from "ejs";
import { SSR } from "atarime";
import ReactDOMServer from "react-dom/server";
import compress from "compression";
import express from "express";
import morgan from "morgan";
import * as React from "react";
import errorHandler from "errorhandler";

const port = 3000;

const app = express();
const server = http.createServer(app);

app.use(
  compress({
    filter: function() {
      return true;
    }
  })
);
app.use(morgan("combined"));

let outputFileSystem = require("fs");
let viewFile = path.join(__dirname, "view/index.html");
if (process.env.NODE_ENV !== "production") {
  // Webpack Compiler
  const webpack = require("webpack");
  const webpackConfig = require("../webpack.config.dev");
  const compiler = webpack(webpackConfig);
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const chokidar = require("chokidar");

  // Webpack Dev Middleware
  const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true
  });
  app.use(webpackDevMiddlewareInstance);

  // Open browser
  webpackDevMiddlewareInstance.waitUntilValid(function() {
    const openBrowser = require("react-dev-utils/openBrowser");

    const url = "http://localhost:" + port;
    openBrowser(url);
  });

  app.use(webpackHotMiddleware(compiler));

  const watcher = chokidar.watch(path.resolve(__dirname, "./app"));
  watcher.on("all", function() {
    Object.keys(require.cache).forEach(function(id) {
      if (/[/\\]src[/\\]/.test(id)) {
        delete require.cache[id];
      }
    });
  });

  outputFileSystem = compiler.outputFileSystem;
  viewFile = path.join(compiler.outputPath, "view/index.html");

  server.keepAliveTimeout = 0;

  // 500 error (Node)
  app.use(function(req, res, next) {
    const reqd = domain.create();
    reqd.on("error", function(err) {
      errorHandler()(err, req, res, next);
    });
    reqd.run(next);
  });
}

app.use(
  "/static",
  express.static(path.join(__dirname, "static"), {
    maxAge: 30 * 86400000
  })
);
app.use("/favicon.ico", function(req, res) {
  res.sendFile(path.join(__dirname, "favicon.ico"));
});

app.get("*", function(req, res) {
  const { setRoute } = require("./app/routes");
  const serverRouter = SSR.createServerRouter();
  setRoute(serverRouter);

  serverRouter.resolveComponentByPathname(req.url, (Root, data) => {
    outputFileSystem.readFile(
      viewFile,
      (err: NodeJS.ErrnoException, result: Buffer) => {
        const compiled = ejs.compile(result.toString("utf8"));
        let component = null;
        try {
          component = ReactDOMServer.renderToString(React.createElement(Root));
        } catch (e) {
          console.error(e);
        }

        const html = compiled({
          component: component,
          data: data
        });

        res.write(html);
        res.end();
      }
    );
  });
});

// 500 error (middleware)
if (process.env.NODE_ENV !== "production") {
  app.use(errorHandler());
}

server.listen(process.env.PORT || port, function() {
  console.log("Listening on");
});
