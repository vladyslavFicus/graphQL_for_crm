const { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLFloat, GraphQLInt } = require('graphql');

const TradingAccountsListProfileType = new GraphQLObjectType({
  name: 'TradingAccountsListProfile',
  fields: () => ({
    uuid: { type: GraphQLString },
    fullName: { type: GraphQLString },
  }),
});

const TradingAccountsListAffiliateType = new GraphQLObjectType({
  name: 'TradingAccountsListAffiliate',
  fields: () => ({
    affiliateType: { type: GraphQLString },
    source: { type: GraphQLString },
  }),
});

const TradingAccountsListType = new GraphQLObjectType({
  name: 'TradingAccountsListType',
  fields: () => ({
    uuid: { type: GraphQLString },
    platformType: { type: GraphQLString },
    profile: {
      type: TradingAccountsListProfileType,
      resolve: ({ profile }) => profile,
    },
    affiliate: {
      type: TradingAccountsListAffiliateType,
      resolve: ({ affiliate }) => affiliate,
    },
    createdAt: { type: GraphQLString },
    leverage: { type: GraphQLInt },
    balance: { type: GraphQLFloat },
    archived: { type: GraphQLBoolean },
    accountType: { type: GraphQLString },
    currency: { type: GraphQLString },
  }),
});

module.exports = TradingAccountsListType;
