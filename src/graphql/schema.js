const { GraphQLSchema } = require('graphql');
const query = require('./query');
const mutation = require('./mutation');
const input = require('./input');

const schema = new GraphQLSchema({
  query,
  mutation,
  input,
});

module.exports = schema;
