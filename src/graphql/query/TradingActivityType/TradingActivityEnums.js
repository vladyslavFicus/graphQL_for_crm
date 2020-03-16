const { GraphQLEnumType } = require('graphql');

const operationTypesEnum = new GraphQLEnumType({
  name: 'operationTypes',
  values: {
    OP_BUY: { value: 'OP_BUY' },
    OP_SELL: { value: 'OP_SELL' },
    OP_BUY_LIMIT: { value: 'OP_BUY_LIMIT' },
    OP_SELL_LIMIT: { value: 'OP_SELL_LIMIT' },
    OP_BUY_STOP: { value: 'OP_BUY_STOP' },
    OP_SELL_STOP: { value: 'OP_SELL_STOP' },
    OP_BUY_MARKET: { value: 'OP_BUY_MARKET' },
    OP_SELL_MARKET: { value: 'OP_SELL_MARKET' },
    OP_BUY_STOP_LIMIT: { value: 'OP_BUY_STOP_LIMIT' },
    OP_SELL_STOP_LIMIT: { value: 'OP_SELL_STOP_LIMIT' },
    OP_BALANCE: { value: 'OP_BALANCE' },
    OP_CREDIT: { value: 'OP_CREDIT' },
  },
});

const StatusesEnum = new GraphQLEnumType({
  name: 'tradingActivityStatus',
  values: {
    OPEN: { value: 'OPEN' },
    CLOSED: { value: 'CLOSED' },
    PENDING: { value: 'PENDING' },
  },
});

module.exports = {
  operationTypesEnum,
  StatusesEnum,
};
