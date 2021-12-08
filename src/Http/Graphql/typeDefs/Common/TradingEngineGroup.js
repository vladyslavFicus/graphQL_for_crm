const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineGroup__GroupSecurities {
    security: TradingEngineSecurity
    show: Boolean
  }

  type TradingEngineGroup {
    groupName: String
    brand: String
    marginCallLevel: Int
    stopoutLevel: Int
    groupSecurities: [TradingEngineGroup__GroupSecurities]
  }
`;
