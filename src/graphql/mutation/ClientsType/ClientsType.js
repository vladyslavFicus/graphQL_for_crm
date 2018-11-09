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
  clients: { bulkRepresentativeUpdate, profileBulkUpdate },
} = require('../../common/resolvers');
const { ResponseType } = require('../../common/types');

const ClientSearchParams = new GraphQLInputObjectType({
  name: 'ClientSearchParams',
  fields: () => ({
    searchValue: { type: GraphQLString },
    countries: { type: new GraphQLList(GraphQLString) },
    teams: { type: GraphQLString },
    desks: { type: GraphQLString },
    status: { type: GraphQLString },
    acquisitionStatus: { type: GraphQLString },
    tradingBalanceFrom: { type: GraphQLFloat },
    tradingBalanceTo: { type: GraphQLFloat },
    registrationDateFrom: { type: GraphQLString },
    registrationDateTo: { type: GraphQLString },
    hierarchyUsers: { type: new GraphQLList(GraphQLString) },
  }),
});

const ClientsMutation = new GraphQLObjectType({
  name: 'ClientsMutation',
  fields: () => ({
    bulkRepresentativeUpdate: {
      args: {
        teamId: { type: GraphQLString },
        salesRep: { type: GraphQLString },
        retentionRep: { type: GraphQLString },
        salesStatus: { type: GraphQLString },
        retentionStatus: { type: GraphQLString },
        type: { type: new GraphQLNonNull(GraphQLString) },
        allRowsSelected: { type: new GraphQLNonNull(GraphQLBoolean) },
        ids: { type: new GraphQLList(GraphQLString) },
        totalElements: { type: GraphQLInt },
        searchParams: { type: ClientSearchParams },
      },
      type: ResponseType(GraphQLString, 'clientRepresentativeBulkUpdate'),
      resolve: bulkRepresentativeUpdate,
    },
    profileBulkUpdate: {
      args: {
        aquisitionStatus: { type: GraphQLString },
        allRowsSelected: { type: new GraphQLNonNull(GraphQLBoolean) },
        ids: { type: new GraphQLList(GraphQLString) },
        totalElements: { type: GraphQLInt },
        searchParams: { type: ClientSearchParams },
      },
      type: ResponseType(GraphQLString, 'profileBulkUpdate'),
      resolve: profileBulkUpdate,
    },
  }),
});

module.exports = ClientsMutation;
