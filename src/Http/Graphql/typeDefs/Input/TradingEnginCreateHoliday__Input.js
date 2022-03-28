const { gql } = require('apollo-server-express');

module.exports = gql`
  input TradingEngineCreateHoliday__TimeRange__Input {
    from: String
    to: String
  }

  input TradingEngineCreateHoliday__Input {
    enabled: Boolean
    description: String!
    annual: Boolean
    date: String!
    timeRange: TradingEngineCreateHoliday__TimeRange__Input
    symbols: [String!]!
  }
`;
