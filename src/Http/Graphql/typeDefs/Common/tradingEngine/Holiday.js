const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineHoliday__TimeRange {
    from: String!
    to: String!
  }

  type TradingEngineHoliday {
    id: ID!
    enabled: Boolean!
    description: String
    annual: Boolean!
    date: String!
    timeRange: TradingEngineHoliday__TimeRange!
    symbols: [String!]!
  }
`;
