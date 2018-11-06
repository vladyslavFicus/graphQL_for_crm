const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const CreatedPaymentType = new GraphQLObjectType({
  name: 'createdPayment',
  fields: () => ({
    paymentId: { type: new GraphQLNonNull(GraphQLString) },
    generationDate: { type: new GraphQLNonNull(GraphQLString) },
    redirectLink: { type: GraphQLString },
  }),
});

module.exports = {
  CreatedPaymentType,
};
