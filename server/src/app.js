const express = require("express");
const cors = require("cors");

const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema");

const app = express();

app.use(
  "/graphql",
  cors(),
  graphqlHTTP(() => ({
    schema,
    pretty: true,
    graphiql: true,
  }))
);

// Export your express server so you can import it in the lambda function.
module.exports = app;
