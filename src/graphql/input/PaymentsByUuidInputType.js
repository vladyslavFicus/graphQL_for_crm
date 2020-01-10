const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const PaymentsByUuidInputType = new GraphQLInputObjectType({
  name: 'PaymentsByUuidInputType',
  fields: () => ({
    limit: { type: GraphQLInt },
    page: { type: GraphQLInt },
    playerUUID: { type: new GraphQLNonNull(GraphQLString) },
    searchParam: { type: GraphQLString },
    type: { type: GraphQLString },
    statuses: { type: new GraphQLList(GraphQLString) },
    paymentTypes: { type: new GraphQLList(GraphQLString) },
    paymentAggregator: { type: GraphQLString },
    paymentMethods: { type: new GraphQLList(GraphQLString) },
    creationTimeFrom: { type: GraphQLString },
    creationTimeTo: { type: GraphQLString },
    modificationTimeFrom: { type: GraphQLString },
    modificationTimeTo: { type: GraphQLString },
    statusChangedTimeFrom: { type: GraphQLString },
    statusChangedTimeTo: { type: GraphQLString },
    amountFrom: { type: GraphQLFloat },
    amountTo: { type: GraphQLFloat },
    agentIds: { type: new GraphQLList(GraphQLString) },
    accountType: { type: GraphQLString },
    firstTimeDeposit: { type: GraphQLBoolean },
  }),
});

module.exports = PaymentsByUuidInputType;
