"use strict";

// eslint-disable-next-line import/no-unresolved
const express = require("express");
const cors = require("cors");

const path = require("path");

const { graphqlHTTP } = require("express-graphql");

const schema = require("./src/schema");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const staticPath = path.join(__dirname, "build");
const publicPath = path.join(__dirname, "build", "index.html");

app.use(express.static(staticPath));
app.get("/*", (_, res) => res.sendFile(publicPath));

app.use(
  "/graphql",
  cors(),
  graphqlHTTP(() => ({
    schema,
    pretty: true,
    graphiql: true,
  }))
);

module.exports = app;
