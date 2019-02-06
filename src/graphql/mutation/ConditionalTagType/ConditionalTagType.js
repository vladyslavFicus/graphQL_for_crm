const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const { GraphQLUpload } = require('apollo-server-express');
const ResponseType = require('../../common/types/ResponseType');
const { addTags, disable } = require('../../common/resolvers/conditionalTags');
const { ConditionalTagType } = require('../../query/ConditionalTagType');

const ConditionalTagMutationType = new GraphQLObjectType({
  name: 'ConditionalTagMutation',
  fields: () => ({
    addTags: {
      args: {
        tag: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        file: { type: new GraphQLNonNull(GraphQLUpload) },
        type: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(ConditionalTagType, 'AddConditionalTags'),
      resolve: addTags,
    },
    disableTag: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: disable,
      type: ResponseType(ConditionalTagType, 'DisableConditionalTag'),
    },
  }),
});

module.exports = ConditionalTagMutationType;
