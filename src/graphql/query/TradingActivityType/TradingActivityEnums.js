const { GraphQLEnumType } = require('graphql');

const CommandsEnum = new GraphQLEnumType({
  name: 'tradingActivityCommand',
  values: {
    OP_BUY: { value: 'OP_BUY' },
    OP_SELL: { value: 'OP_SELL' },
    OP_BUY_LIMIT: { value: 'OP_BUY_LIMIT' },
    OP_SELL_LIMIT: { value: 'OP_SELL_LIMIT' },
    OP_BUY_STOP: { value: 'OP_BUY_STOP' },
    OP_SELL_STOP: { value: 'OP_SELL_STOP' },
    OP_BALANCE: { value: 'OP_BALANCE' },
    OP_CREDIT: { value: 'OP_CREDIT' },
  },
});

const StatusesEnum = new GraphQLEnumType({
  name: 'tradingActivityStatus',
  values: {
    OPEN: { value: 'OPEN' },
    CLOSED: { value: 'CLOSED' },
  },
});

module.exports = {
  CommandsEnum,
  StatusesEnum,
};
