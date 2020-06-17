const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');
const { profile: { createProfile } } = require('../../common/resolvers');
const CreateProfileInputType = require('../../input/CreateProfileInputType');
const { ResponseType } = require('../../common/types');

const PromotedLeadType = new GraphQLObjectType({
  name: 'PromotedLeadType',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const LeadsMutation = new GraphQLObjectType({
  name: 'LeadsMutation',
  fields: () => ({
    promote: {
      args: {
        args: { type: CreateProfileInputType },
      },
      type: ResponseType(PromotedLeadType),
      resolve: createProfile,
    },
  }),
});

module.exports = LeadsMutation;
