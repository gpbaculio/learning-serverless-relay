const { expect } = require("chai");
const { describe, it } = require("mocha");
const { graphqlSync } = require("graphql");
const { addMocksToSchema } = require("@graphql-tools/mock");
const casual = require("casual");

const schema = require("../schema");

const schemaWithMocks = addMocksToSchema({
  schema,
  resolvers: () => ({
    Viewer: {
      user: () => "guest",
      listings: () => ({
        edges: [
          {
            node: {
              title: casual.title,
              created: casual.unix_time,
              num_comments: casual.integer(1, 1000),
              thumbnail: `${casual.url}/${casual.unix_time}.jpg`,
              author: casual.username,
              name: casual.word,
            },
          },
          {
            node: {
              title: casual.title,
              created: casual.unix_time,
              num_comments: casual.integer(1, 1000),
              thumbnail: `${casual.url}/${casual.unix_time}.jpg`,
              author: casual.username,
              name: casual.word,
            },
          },
        ],
      }),
    },
  }),
  preserveResolvers: false,
});

describe("query test", () => {
  it("fetches viewer user type and listings", async () => {
    const query = `
      query ViewerQuery {
        viewer { 
          user
          listings {
            edges {
              node {
                title
                created
                num_comments
                thumbnail
                author
                name
              }
            }
          }
        }
      }      
    `;

    const { data } = graphqlSync(schemaWithMocks, query);

    expect(data).to.be.an("object");
    expect(data).to.have.property("viewer");
    expect(data.viewer).to.have.keys(["user", "listings"]);
    expect(data.viewer).to.have.property("user").to.be.a("string");
    expect(data.viewer)
      .to.have.property("listings")
      .to.have.property("edges")
      .to.be.an("array");
    data.viewer.listings.edges.forEach((edge) => {
      expect(edge).to.have.property("node");
      expect(edge.node).to.have.property("title").to.be.a("string");
      expect(edge.node).to.have.property("created").to.be.a("number");
      expect(edge.node).to.have.property("num_comments").to.be.a("number");
      expect(edge.node).to.have.property("thumbnail").to.be.a("string");
      expect(edge.node).to.have.property("author").to.be.a("string");
      expect(edge.node).to.have.property("name").to.be.a("string");
    });
  });
});
