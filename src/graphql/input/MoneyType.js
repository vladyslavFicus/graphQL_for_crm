const { GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLFloat } = require('graphql');

const MoneyType = new GraphQLInputObjectType({
  name: 'InputMoney',
  fields: () => ({
    amount: { type: new GraphQLNonNull(GraphQLFloat) },
    currency: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = MoneyType;
