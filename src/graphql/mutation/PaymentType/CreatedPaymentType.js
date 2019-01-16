const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const CreatedPaymentType = new GraphQLObjectType({
  name: 'createdPayment',
  fields: () => ({
    paymentId: { type: GraphQLString },
    generationDate: { type: GraphQLString },
    redirectLink: { type: GraphQLString },
  }),
});

module.exports = {
  CreatedPaymentType,
};
