const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLBoolean } = require('graphql');
const PartnerType = require('../../query/PartnerType');
const ResponseType = require('../../common/types/ResponseType');
const { updatePartner, createPartner } = require('../../common/resolvers/partners');

const PartnerMutation = new GraphQLObjectType({
  name: 'PartnerMutation',
  fields: () => ({
    createPartner: {
      args: {
        branchId: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLString },
        password: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLString },
      },
      type: ResponseType(PartnerType, 'CreatedPartnerType'),
      resolve: createPartner,
    },
    updatePartner: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: GraphQLString },
        country: { type: GraphQLString },
        allowedIpAddresses: { type: new GraphQLList(GraphQLString) },
        forbiddenCountries: { type: new GraphQLList(GraphQLString) },
        showNotes: { type: GraphQLBoolean },
        showSalesStatus: { type: GraphQLBoolean },
        showFTDAmount: { type: GraphQLBoolean },
      },
      type: ResponseType(PartnerType, 'UpdatedPartnerType'),
      resolve: updatePartner,
    },
  }),
});

module.exports = PartnerMutation;
