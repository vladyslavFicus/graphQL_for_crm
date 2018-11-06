const { GraphQLNonNull, GraphQLObjectType, GraphQLString } = require('graphql');

const PaymentStatusType = new GraphQLObjectType({
  name: 'PaymentStatus',
  fields: () => ({
    creationTime: { type: new GraphQLNonNull(GraphQLString) },
    initiatorId: { type: new GraphQLNonNull(GraphQLString) },
    initiatorType: { type: new GraphQLNonNull(GraphQLString) },
    paymentStatus: { type: new GraphQLNonNull(GraphQLString) },
    reason: { type: GraphQLString },
    reference: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = PaymentStatusType;
