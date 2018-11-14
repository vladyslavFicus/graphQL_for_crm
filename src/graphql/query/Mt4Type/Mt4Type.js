const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const { getAvailableCurrenciesResolver } = require('../../common/resolvers/tradingAccount');

module.exports = new GraphQLObjectType({
  name: 'Mt4Type',
  fields: () => ({
    currencies: {
      type: new GraphQLList(GraphQLString),
      resolve: getAvailableCurrenciesResolver,
    },
  }),
});
