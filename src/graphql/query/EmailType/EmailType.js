const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');

const EmailType = new GraphQLObjectType({
  name: 'EmailType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    subject: { type: GraphQLString },
    text: { type: GraphQLString },
  }),
});

module.exports = EmailType;
