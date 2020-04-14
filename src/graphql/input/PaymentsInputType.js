const { GraphQLInputObjectType, GraphQLBoolean, GraphQLString, GraphQLFloat, GraphQLList } = require('graphql');

const PageInputType = require('./PageInputType');

const PaymentsInputType = new GraphQLInputObjectType({
  name: 'PaymentsInputType',
  fields: () => ({
    page: { type: PageInputType },
    searchParam: { type: GraphQLString },
    countries: { type: new GraphQLList(GraphQLString) },
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
    currency: { type: GraphQLString },
    desks: { type: new GraphQLList(GraphQLString) },
    teams: { type: new GraphQLList(GraphQLString) },
    agentIds: { type: new GraphQLList(GraphQLString) },
    accountType: { type: GraphQLString },
    firstTimeDeposit: { type: GraphQLBoolean },
    affiliateUuids: { type: new GraphQLList(GraphQLString) },
    warnings: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = PaymentsInputType;
