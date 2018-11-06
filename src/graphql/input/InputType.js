const { GraphQLObjectType } = require('graphql');
const MoneyType = require('./MoneyType');

const InputType = new GraphQLObjectType({
  name: 'Input',
  fields: () => ({
    moneyType: { type: MoneyType },
  }),
});

module.exports = InputType;
