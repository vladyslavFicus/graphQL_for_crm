const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineSymbolPrice {
    name: String!
    ask: Float!
    bid: Float!
    time: String!
  }
`;
