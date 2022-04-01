const { gql } = require('apollo-server-express');

module.exports = gql`
  input TradingEngineHolidays__DateTimeRange__Input {
    from: String
    to: String
  }

  input TradingEngineHolidays__Input {
    description: String
    dateTimeRange: TradingEngineHolidays__DateTimeRange__Input
    page: Page__Input
  }
`;
