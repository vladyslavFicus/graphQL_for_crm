const { GraphQLObjectType } = require('graphql');
const OperatorTypeFields = require('./OperatorTypeFields');

module.exports = new GraphQLObjectType({
  name: 'OperatorType',
  fields: () => OperatorTypeFields,
});
