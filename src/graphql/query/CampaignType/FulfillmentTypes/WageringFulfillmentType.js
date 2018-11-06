const { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const MoneyType = require('../../../common/types/MoneyType');

const WageringFulfillmentType = new GraphQLObjectType({
  name: 'WageringFulfillment',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID), resolve: ({ uuid }) => uuid },
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    amounts: { type: new GraphQLList(MoneyType) },
  }),
});

module.exports = WageringFulfillmentType;
