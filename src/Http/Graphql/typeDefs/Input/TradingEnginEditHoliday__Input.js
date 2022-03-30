const { gql } = require('apollo-server-express');

module.exports = gql`
  input TradingEngineEditHoliday__TimeRange__Input {
    from: String!
    to: String!
  }

  input TradingEngineEditHoliday__Input {
    id: ID!
    enabled: Boolean!
    description: String!
    annual: Boolean!
    date: String!
    timeRange: TradingEngineEditHoliday__TimeRange__Input!
    symbols: [String!]
  }
`;
