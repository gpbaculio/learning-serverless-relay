const { GraphQLObjectType } = require("graphql");
const GraphQLViewerType = require("./Viewer");

const query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    viewer: {
      type: GraphQLViewerType,
      resolve: () => 'guest',
    },
  }),
});

module.exports = query;
