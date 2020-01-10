const {
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const PaymentsInputType = new GraphQLInputObjectType({
  name: 'PaymentsInputType',
  fields: () => ({
    limit: { type: GraphQLInt },
    page: { type: GraphQLInt },
    searchParam: { type: GraphQLString },
    countries: { type: new GraphQLList(GraphQLString) },
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
    currency: { type: GraphQLString },
    agentIds: { type: new GraphQLList(GraphQLString) },
    accountType: { type: GraphQLString },
    firstTimeDeposit: { type: GraphQLBoolean },
    affiliateUuids: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = PaymentsInputType;
