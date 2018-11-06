const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} = require('graphql');

const { TagTypeEnum, ResponseType } = require('../../common/types');
const TagType = require('../../query/TagType');
const {
  tags: { addTag, createTag, removeTag, unlinkTag },
} = require('../../common/resolvers');

const TagMutation = new GraphQLObjectType({
  name: 'TagMutation',
  fields: () => ({
    add: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        tag: { type: new GraphQLNonNull(GraphQLString) },
        priority: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(TagType, 'addTag'),
      resolve: addTag,
    },
    createOrLink: {
      args: {
        tagId: { type: GraphQLString },
        tagType: { type: new GraphQLNonNull(TagTypeEnum) },
        tagName: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLString },
        targetUUID: { type: GraphQLString },
        pinned: { type: GraphQLBoolean },
      },
      type: ResponseType(new GraphQLList(TagType), 'createTag'),
      resolve: createTag,
    },
    remove: {
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(
        new GraphQLObjectType({
          name: 'removeTag',
          fields: () => ({
            id: { type: new GraphQLNonNull(GraphQLID) },
          }),
        }),
        'removeTagResponse'
      ),
      resolve: removeTag,
    },
    unlink: {
      args: {
        tagId: { type: GraphQLString },
        targetUUID: { type: GraphQLString },
      },
      type: new GraphQLObjectType({
        name: 'unlinkTag',
        fields: () => ({
          success: { type: new GraphQLNonNull(GraphQLBoolean) },
        }),
      }),
      resolve: unlinkTag,
    },
  }),
});

module.exports = TagMutation;
