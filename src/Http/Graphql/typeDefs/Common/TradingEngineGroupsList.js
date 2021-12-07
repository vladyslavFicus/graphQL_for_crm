const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineGroupsList__GroupSecurities {
    security: TradingEngineSecurity
    show: Boolean
  }

  type TradingEngineGroupsList {
    groupName: String
    brand: String
    marginCallLevel: Int
    stopoutLevel: Int
    groupSecurities: [TradingEngineGroupsList__GroupSecurities]
  }
`;
