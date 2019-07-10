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
const ClientSearchInputType = require('../../input/ClientSearchInputType');

const ClientBulkUpdateType = new GraphQLInputObjectType({
  name: 'ClientBulkUpdateType',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    unassignFromOperator: { type: GraphQLString },
    assignToOperator: { type: GraphQLString },
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
  }),
});

module.exports = ClientsMutation;
