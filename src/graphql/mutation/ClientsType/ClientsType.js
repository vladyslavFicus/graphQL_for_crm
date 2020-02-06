const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLBoolean,
} = require('graphql');
const {
  clients: { bulkRepresentativeUpdate, bulkMigrationUpdate },
} = require('../../common/resolvers');
const { ResponseType } = require('../../common/types');
const SuccessType = require('../../query/SuccessType');
const ClientSearchInputType = require('../../input/ClientSearchInputType');

const ClientBulkUpdateType = new GraphQLInputObjectType({
  name: 'ClientBulkUpdateType',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    salesRepresentative: { type: GraphQLString },
    retentionRepresentative: { type: GraphQLString },
  }),
});

const ClientBulkMigrateType = new GraphQLInputObjectType({
  name: 'ClientBulkMigrateType',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const ClientsMutation = new GraphQLObjectType({
  name: 'ClientsMutation',
  fields: () => ({
    bulkRepresentativeUpdate: {
      args: {
        teamId: { type: GraphQLString },
        salesRepresentative: { type: new GraphQLList(GraphQLString) },
        retentionRepresentative: { type: new GraphQLList(GraphQLString) },
        salesStatus: { type: GraphQLString },
        retentionStatus: { type: GraphQLString },
        type: { type: new GraphQLNonNull(GraphQLString) },
        isMoveAction: { type: GraphQLBoolean },
        clients: { type: new GraphQLList(ClientBulkUpdateType) },
        allRowsSelected: { type: GraphQLBoolean },
        totalElements: { type: GraphQLInt },
        searchParams: { type: ClientSearchInputType },
      },
      type: ResponseType(GraphQLString, 'clientRepresentativeBulkUpdate'),
      resolve: bulkRepresentativeUpdate,
    },
    bulkMigrationUpdate: {
      args: {
        clients: { type: new GraphQLList(ClientBulkMigrateType) },
        searchParams: { type: ClientSearchInputType },
        allRowsSelected: { type: GraphQLBoolean },
        totalElements: { type: GraphQLInt },
      },
      type: SuccessType,
      resolve: bulkMigrationUpdate,
    },
  }),
});

module.exports = ClientsMutation;
