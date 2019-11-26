const { GraphQLInputObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList } = require('graphql');

const ClientSearchInputType = new GraphQLInputObjectType({
  name: 'ClientSearchParams',
  fields: () => ({
    page: { type: GraphQLInt },
    size: { type: GraphQLInt },
    acquisitionStatus: { type: GraphQLString },
    tradingBalanceFrom: { type: GraphQLFloat },
    tradingBalanceTo: { type: GraphQLFloat },
    countries: { type: new GraphQLList(GraphQLString) },
    registrationDateFrom: { type: GraphQLString },
    registrationDateTo: { type: GraphQLString },
    lastNoteDateFrom: { type: GraphQLString },
    lastNoteDateTo: { type: GraphQLString },
    lastTradeDateFrom: { type: GraphQLString },
    lastTradeDateTo: { type: GraphQLString },
    lastLoginDateFrom: { type: GraphQLString },
    lastLoginDateTo: { type: GraphQLString },
    lastModificationDateFrom: { type: GraphQLString },
    lastModificationDateTo: { type: GraphQLString },
    searchValue: { type: GraphQLString },
    status: { type: new GraphQLList(GraphQLString) },
    repIds: { type: new GraphQLList(GraphQLString) },
    assignStatus: { type: GraphQLString },
    kycStatus: { type: new GraphQLList(GraphQLString) },
    firstDeposit: { type: GraphQLString },
    salesStatuses: { type: new GraphQLList(GraphQLString) },
    retentionStatuses: { type: new GraphQLList(GraphQLString) },
    searchAffiliate: { type: GraphQLString },
    migrationId: { type: GraphQLString },
    requestId: { type: GraphQLString },
    desk: { type: new GraphQLList(GraphQLString) },
    team: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = ClientSearchInputType;
