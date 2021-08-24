const { GraphQLObjectType, GraphQLString } = require("graphql");

const query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    viewer: {
      type: GraphQLString,
      resolve: () => {
        return "test";
      },
    },
  }),
});

module.exports = query;
