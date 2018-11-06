const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFloat } = require('graphql');

const MoneyType = new GraphQLObjectType({
  name: 'Money',
  fields: () => ({
    amount: { type: new GraphQLNonNull(GraphQLFloat) },
    currency: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = MoneyType;
