const { GraphQLString, GraphQLObjectType, GraphQLScalarType } = require('graphql');

const ErrorType = new GraphQLObjectType({
  name: 'Error',
  description: 'User error type 4**',
  fields: () => ({
    error: {
      type: GraphQLString,
      resolve(_) {
        return _.error || _.errorMessage || (typeof _ === 'string' ? _ : null);
      },
    },
    fields_errors: {
      type: new GraphQLScalarType({
        name: 'elements',
        serialize(value) {
          return value;
        },
      }),
    },
    errorParameters: {
      type: new GraphQLScalarType({
        name: 'errorParameters',
        serialize(value) {
          return value;
        },
      }),
    },
  }),
});

module.exports = ErrorType;
