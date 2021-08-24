const { GraphQLObjectType, GraphQLString } = require("graphql");

const query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    viewer: {
      type: GraphQLString,
      resolve: () => {
        return "teste dited724 asdasd726";
      },
    },
  }),
});

module.exports = query;
