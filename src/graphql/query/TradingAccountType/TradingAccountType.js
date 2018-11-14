const { GraphQLObjectType } = require('graphql');
const Mt4Type = require('../Mt4Type');

const TradingAccountType = new GraphQLObjectType({
  name: 'TradingAccountQuery',
  fields: () => ({
    mt4: {
      type: Mt4Type,
      resolve: () => ({}),
    },
  }),
});

module.exports = TradingAccountType;
