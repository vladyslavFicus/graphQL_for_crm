const { gql } = require('apollo-server-express');

module.exports = gql`
  enum TradingEngine__OperatorRoles__Enum {
    ADMINISTRATION
    MANAGER
    AGENT
  }
`;
