const { gql } = require('apollo-server-express');

module.exports = gql`
input TradingEngineOperatorSearchDateRange__Input {
  from: String
  to: String
}

type TradingEngineOperatorSearch__Input {
  keyword: String,
  groupNames: [String],
  statuses: TradingEngine__OperatorStatuses__Enum
  registrationDateRange: TradingEngineOperatorSearchDateRange__Input
  page: Page__Input
}

`;
