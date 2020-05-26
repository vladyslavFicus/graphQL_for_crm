const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const PartnerType = require('../../query/PartnerType');
const ResponseType = require('../../common/types/ResponseType');
const { createPartner, updatePartner, changeStatus } = require('../../common/resolvers/partners');

const PartnerPermissionInputType = new GraphQLInputObjectType({
  name: 'PartnerPermissionUpdate',
  fields: () => ({
    showNotes: { type: GraphQLBoolean },
    showFTDAmount: { type: GraphQLBoolean },
    showSalesStatus: { type: GraphQLBoolean },
    showKycStatus: { type: GraphQLBoolean },
    forbiddenCountries: { type: new GraphQLList(GraphQLString) },
    allowedIpAddresses: { type: new GraphQLList(GraphQLString) },
  }),
});

const PartnerMutation = new GraphQLObjectType({
  name: 'PartnerMutation',
  fields: () => ({
    createPartner: {
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLString },
        public: { type: GraphQLBoolean },
        cellexpert: { type: GraphQLBoolean },
        externalAffiliateId: { type: GraphQLString },
        satellite: { type: GraphQLString },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(PartnerType, 'CreatedPartnerType'),
      resolve: createPartner,
    },
    updatePartner: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        externalAffiliateId: { type: GraphQLString },
        phone: { type: GraphQLString },
        country: { type: GraphQLString },
        email: { type: GraphQLString },
        satellite: { type: GraphQLString },
        public: { type: GraphQLBoolean },
        cellexpert: { type: GraphQLBoolean },
        permission: { type: PartnerPermissionInputType },
        tradingAccountAutocreation: { type: GraphQLString },
        tradingAccountType: { type: GraphQLString },
        tradingAccountCurrency: { type: GraphQLString },
      },
      type: ResponseType(PartnerType, 'UpdatedPartnerType'),
      resolve: updatePartner,
    },
    changeStatus: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        reason: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: new GraphQLObjectType({
        name: 'changePartnerStatusType',
        fields: () => ({
          success: {
            type: new GraphQLNonNull(GraphQLBoolean),
          },
        }),
      }),
      resolve: changeStatus,
    },
  }),
});

module.exports = PartnerMutation;
