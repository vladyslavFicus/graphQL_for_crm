const { GraphQLObjectType, GraphQLList } = require('graphql');

const MoneyType = require('../../input/MoneyType');
const ResponseType = require('../../common/types/ResponseType');
const WageringType = require('../../query/CampaignType/FulfillmentTypes/WageringFulfillmentType');
const {
  campaigns: {
    fulfillments: { addWageringFulfillment },
  },
} = require('../../common/resolvers');

const WageringFulfillmentType = new GraphQLObjectType({
  name: 'WageringFulfillmentMutation',
  fields: () => ({
    add: {
      args: {
        amounts: { type: new GraphQLList(MoneyType) },
      },
      type: ResponseType(WageringType, 'AddWageringFulfillment'),
      resolve: addWageringFulfillment,
    },
  }),
});

module.exports = WageringFulfillmentType;
