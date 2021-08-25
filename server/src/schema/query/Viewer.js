const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const {
  globalIdField,
  connectionArgs,
  connectionFromArray,
  connectionDefinitions,
} = require("graphql-relay");
const axios = require("axios");

const GraphQLListType = new GraphQLObjectType({
  name: "List",
  fields: () => ({
    id: globalIdField("List"),
    author: {
      type: GraphQLString,
      resolve: ({ author }) => author,
    },
    thumbnail: {
      type: GraphQLString,
      resolve: ({ thumbnail }) => thumbnail,
    },
    title: {
      type: GraphQLString,
      resolve: ({ title }) => title,
    },
    num_comments: {
      type: GraphQLInt,
      resolve: ({ num_comments }) => num_comments,
    },
    created: {
      type: GraphQLInt,
      resolve: ({ created }) => created,
    },
    name: {
      type: GraphQLString,
      resolve: ({ name }) => name,
    },
  }),
});

const { connectionType: listingsConnection, edgeType: GraphQLListingEdge } =
  connectionDefinitions({ name: "Listing", nodeType: GraphQLListType });

const GraphQLViewerType = new GraphQLObjectType({
  name: "Viewer",
  fields: () => ({
    id: globalIdField("Viewer"),
    user: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.user,
    },
    listings: {
      type: listingsConnection,
      args: {
        ...connectionArgs,
        id: { type: GraphQLString },
      },
      resolve: async (_, { first, after }) => {
        try {
          const { data } = await axios.get("https://reddit.com/top.json", {
            params: {
              limit: 100,
            },
          });

          const result = data.data.children.map(({ data }) => ({
            ...data,
            id: data.name,
          }));

          return connectionFromArray(result, { first, after });
        } catch (e) {
          return null;
        }
      },
    },
  }),
});

exports.GraphQLListingEdge = GraphQLListingEdge;
exports.listingsConnection = listingsConnection;

module.exports = GraphQLViewerType;
