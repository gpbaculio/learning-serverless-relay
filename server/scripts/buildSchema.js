// external imports
const fs = require("fs");
const path = require("path");
const { graphql } = require("graphql");
const { getIntrospectionQuery } = require("graphql");
const mkdirp = require("mkdirp");
// local imports
const schema = require("../src/schema");
const gqlSchemaPath = __dirname + "/../../reddit-top/data/schema.json";
graphql(schema, getIntrospectionQuery())
  .then((result) => {
    if (result.errors) {
      console.error(
        "ERROR introspecting schema: ",
        JSON.stringify(result.errors, null, 2)
      );
    } else {
      mkdirp(path.dirname(gqlSchemaPath), (err) => {
        // if something went wrong
        if (err) {
          throw new Error(err);
        }
        fs.writeFileSync(gqlSchemaPath, JSON.stringify(result, null, 2));
        console.log(`Successfully built schema in ${gqlSchemaPath}.`);
      });
    }
  })
  .catch(console.error);
