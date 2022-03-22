const { gql } = require('apollo-server-express');

module.exports = gql`
  input TradingEngineHolidays__Input {
    description: String
    page: Page__Input
  }
`;
