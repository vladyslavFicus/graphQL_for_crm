const {
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const ClientSearchInputType = new GraphQLInputObjectType({
  name: 'ClientSearchParams',
  fields: () => ({
    acquisitionStatus: { type: GraphQLString },
    assignStatus: { type: GraphQLString },
    balanceRange: {
      type: new GraphQLInputObjectType({
        name: 'ClientSearchBalance',
        fields: () => ({
          from: { type: GraphQLFloat },
          to: { type: GraphQLFloat },
        }),
      }),
    },
    countries: { type: new GraphQLList(GraphQLString) },
    desks: { type: new GraphQLList(GraphQLString) },
    firstTimeDeposit: { type: GraphQLBoolean },
    kycStatuses: { type: new GraphQLList(GraphQLString) },
    lastLoginDateRange: {
      type: new GraphQLInputObjectType({
        name: 'ClientSearchLastLoginDateRange',
        fields: () => ({
          from: { type: GraphQLString },
          to: { type: GraphQLString },
        }),
      }),
    },
    lastModificationDateRange: {
      type: new GraphQLInputObjectType({
        name: 'ClientSearchLastModificationDateRange',
        fields: () => ({
          from: { type: GraphQLString },
          to: { type: GraphQLString },
        }),
      }),
    },
    lastNoteDateRange: {
      type: new GraphQLInputObjectType({
        name: 'ClientSearchLastNoteDateRange',
        fields: () => ({
          from: { type: GraphQLString },
          to: { type: GraphQLString },
        }),
      }),
    },
    lastTradeDateRange: {
      type: new GraphQLInputObjectType({
        name: 'ClientSearchLastTradeDateRange',
        fields: () => ({
          from: { type: GraphQLString },
          to: { type: GraphQLString },
        }),
      }),
    },
    migrationId: { type: GraphQLString },
    operators: { type: new GraphQLList(GraphQLString) },
    affiliateUuids: { type: new GraphQLList(GraphQLString) },
    page: {
      type: new GraphQLInputObjectType({
        name: 'ClientSearchPageAttr',
        fields: () => ({
          from: { type: GraphQLInt },
          size: { type: GraphQLInt },
        }),
      }),
    },
    registrationDateRange: {
      type: new GraphQLInputObjectType({
        name: 'ClientSearchRegistrationDateRange',
        fields: () => ({
          from: { type: GraphQLString },
          to: { type: GraphQLString },
        }),
      }),
    },
    representativeUuids: { type: new GraphQLList(GraphQLString) },
    retentionStatuses: { type: new GraphQLList(GraphQLString) },
    requestId: { type: GraphQLString },
    salesStatuses: { type: new GraphQLList(GraphQLString) },
    searchByAffiliateIdentifiers: { type: GraphQLString },
    searchByIdentifiers: { type: GraphQLString },
    searchLimit: { type: GraphQLInt },
    statuses: { type: new GraphQLList(GraphQLString) },
    teams: { type: new GraphQLList(GraphQLString) },
    questionnaireStatus: { type: GraphQLString },
  }),
});

module.exports = ClientSearchInputType;
