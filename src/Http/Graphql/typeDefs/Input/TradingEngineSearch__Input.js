const { gql } = require('apollo-server-express');

module.exports = gql`
  input TradingEngineSearch__Time__Input {
    from: String
    to: String
  }

  input TradingEngineSearch__Input {
    keyword: String
    orderType: String
    accountLogin: Int
    symbol: String
    openingDateRange: TradingEngineSearch__Time__Input
    orderId: String
    enabled: Boolean
    page: Page__Input
  }
`;
