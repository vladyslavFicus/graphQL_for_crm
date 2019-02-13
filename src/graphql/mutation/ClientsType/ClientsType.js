const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLBoolean,
} = require('graphql');
const {
  clients: { bulkRepresentativeUpdate },
} = require('../../common/resolvers');
const { ResponseType } = require('../../common/types');

const ClientSearchParams = new GraphQLInputObjectType({
  name: 'ClientSearchParams',
  fields: () => ({
    acquisitionStatus: { type: GraphQLString },
    tradingBalanceFrom: { type: GraphQLFloat },
    tradingBalanceTo: { type: GraphQLFloat },
    countries: { type: new GraphQLList(GraphQLString) },
    registrationDateFrom: { type: GraphQLString },
    registrationDateTo: { type: GraphQLString },
    searchValue: { type: GraphQLString },
    status: { type: GraphQLString },
    teams: { type: GraphQLString },
    desks: { type: GraphQLString },
    currency: { type: GraphQLString },
    repIds: { type: new GraphQLList(GraphQLString) },
    assignStatus: { type: GraphQLString },
    profileStatus: { type: GraphQLString },
    kycStatus: { type: GraphQLString },
    firstDeposit: { type: GraphQLString },
    salesStatuses: { type: new GraphQLList(GraphQLString) },
    retentionStatuses: { type: new GraphQLList(GraphQLString) },
  }),
});

const ClientBulkUpdateType = new GraphQLInputObjectType({
  name: 'ClientBulkUpdateType',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    unassignFrom: { type: GraphQLString },
  }),
});

const ClientsMutation = new GraphQLObjectType({
  name: 'ClientsMutation',
  fields: () => ({
    bulkRepresentativeUpdate: {
      args: {
        teamId: { type: GraphQLString },
        salesRep: { type: new GraphQLList(GraphQLString) },
        retentionRep: { type: new GraphQLList(GraphQLString) },
        salesStatus: { type: GraphQLString },
        retentionStatus: { type: GraphQLString },
        aquisitionStatus: { type: GraphQLString },
        type: { type: new GraphQLNonNull(GraphQLString) },
        clients: { type: new GraphQLList(ClientBulkUpdateType) },
        allRowsSelected: { type: GraphQLBoolean },
        totalElements: { type: GraphQLInt },
        searchParams: { type: ClientSearchParams },
      },
      type: ResponseType(GraphQLString, 'clientRepresentativeBulkUpdate'),
      resolve: bulkRepresentativeUpdate,
    },
  }),
});

module.exports = ClientsMutation;
