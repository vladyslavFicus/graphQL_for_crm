const { gql } = require('apollo-server-express');

module.exports = gql`
  input TradingEngineSearch__Input {
    keyword: String
    enabled: Boolean
    page: Page__Input
  }
`;
