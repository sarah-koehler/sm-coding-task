const { ApolloServer } = require('apollo-server');
const DatamuseAPI = require('./DatamuseAPI');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    datamuseAPI: new DatamuseAPI()
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
