const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingActivityMutation {
    changeOriginalAgent(tradeId: Int!, agentId: String!, platformType: String): Boolean
  }
`;
