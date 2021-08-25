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
      type: GraphQLString,
      resolve: ({ created }) => created,
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
      resolve: (user) => user,
    },
    listings: {
      type: listingsConnection,
      args: {
        ...connectionArgs,
      },
      resolve: async (_, { ...args }) => {
        console.log("args: ", args);
        try {
          const { data } = await axios.get("https://reddit.com/top.json", {
            params: {
              limit: 2,
            },
          });
          const result = data.data.children.map(({ data }) => data);
          return connectionFromArray(result, args);
        } catch (e) {
          console.log("e: ", e);
          return null;
        }
      },
    },
  }),
});

exports.GraphQLListingEdge = GraphQLListingEdge;
exports.listingsConnection = listingsConnection;

module.exports = GraphQLViewerType;
