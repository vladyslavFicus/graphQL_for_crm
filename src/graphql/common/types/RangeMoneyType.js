const { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLNonNull } = require('graphql');

const RangeMoneyType = new GraphQLObjectType({
  name: 'RangeMoney',
  fields() {
    return {
      min: { type: new GraphQLNonNull(GraphQLFloat) },
      max: { type: new GraphQLNonNull(GraphQLFloat) },
      currency: { type: new GraphQLNonNull(GraphQLString) },
    };
  },
});

module.exports = RangeMoneyType;
