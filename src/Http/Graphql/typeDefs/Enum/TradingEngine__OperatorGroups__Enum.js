const { gql } = require('apollo-server-express');

module.exports = gql`
  enum TradingEngine__OperatorGroups__Enum {
    ADMINISTRATION
    MANAGER
    AGENT
  }
`;
