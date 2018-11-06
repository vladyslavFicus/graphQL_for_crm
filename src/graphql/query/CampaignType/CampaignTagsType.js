const { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } = require('graphql');

const campaignTagsType = new GraphQLObjectType({
  name: 'CampaignTagsType',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID), resolve: ({ tagId }) => tagId },
    tagId: { type: new GraphQLNonNull(GraphQLString) },
    tagName: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = campaignTagsType;
