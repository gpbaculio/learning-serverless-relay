const { GraphQLObjectType } = require("graphql");
const GraphQLViewerType = require("./Viewer");

const query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    viewer: {
      type: GraphQLViewerType,
      resolve: () => ({
        id: "guest-id",
        user: "guest",
      }),
    },
  }),
});

module.exports = query;
