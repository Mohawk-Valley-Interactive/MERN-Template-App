import bodyParser from "body-parser";
import compress from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";

import { ServerStyleSheets } from "@material-ui/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { indigo, pink } from "@material-ui/core/colors";

import devBundle from "./devBundle";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import Template from "../template";
import MainRouter from "../client/MainRouter";

const app = express();
devBundle.compile(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());
app.use(cors());

const WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(WORKING_DIR, "dist")));

app.use("/api", authRoutes);
app.use("/api", userRoutes);

app.get("*", (req, res) => {
  const stylesSheets = new ServerStyleSheets();
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#757de8",
        main: "#3f51b5",
        dark: "#002984",
        contrastText: "#fff"
      },
      secondary: {
        light: "#ff79b0",
        main: "#ff4081",
        dark: "#c60055",
        contrastText: "#000"
      },
      openTitle: indigo["400"],
      protectedTitle: pink["400"],
      type: "light"
    }
  });
  const context = {};
  const markup = ReactDOMServer.renderToString(
    stylesSheets.collect(
      <StaticRouter location={req.url} context={context}>
        <MuiThemeProvider theme={theme}>
          <MainRouter />
        </MuiThemeProvider>
      </StaticRouter>
    )
  );
  res.status(200).send(
    Template({
      markup: markup,
      css: stylesSheets.toString()
    })
  );
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status("401").json({
      error: err.name + ": " + err.message
    });
  }
});

export default app;
