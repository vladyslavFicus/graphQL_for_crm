const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');

const PageInputType = require('./PageInputType');

const PaymentsByUuidInputType = new GraphQLInputObjectType({
  name: 'PaymentsByUuidInputType',
  fields: () => ({
    page: { type: PageInputType },
    playerUUID: { type: new GraphQLNonNull(GraphQLString) },
    searchParam: { type: GraphQLString },
    type: { type: GraphQLString },
    statuses: { type: new GraphQLList(GraphQLString) },
    paymentTypes: { type: new GraphQLList(GraphQLString) },
    withdrawStatuses: { type: new GraphQLList(GraphQLString) },
    paymentAggregator: { type: GraphQLString },
    paymentMethods: { type: new GraphQLList(GraphQLString) },
    creationTimeFrom: { type: GraphQLString },
    creationTimeTo: { type: GraphQLString },
    modificationTimeFrom: { type: GraphQLString },
    modificationTimeTo: { type: GraphQLString },
    statusChangedTimeFrom: { type: GraphQLString },
    statusChangedTimeTo: { type: GraphQLString },
    requestId: { type: GraphQLString },
    amountFrom: { type: GraphQLFloat },
    amountTo: { type: GraphQLFloat },
    desks: { type: new GraphQLList(GraphQLString) },
    teams: { type: new GraphQLList(GraphQLString) },
    agentIds: { type: new GraphQLList(GraphQLString) },
    accountType: { type: GraphQLString },
    firstTimeDeposit: { type: GraphQLBoolean },
    warnings: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = PaymentsByUuidInputType;
