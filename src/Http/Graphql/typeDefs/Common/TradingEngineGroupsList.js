const { gql } = require('apollo-server-express');

module.exports = gql`  
  type TradingEngineGroupsList__groupSecurity {
    name: String
  }

  type TradingEngineGroupsList__groupSecurities {
    security: TradingEngineGroupsList__groupSecurity
    show: Boolean
  }

  type TradingEngineGroupsList {
    groupName: String
    brand: String
    marginCallLevel: Int
    stopoutLevel: Int
    groupSecurities: [TradingEngineGroupsList__groupSecurities]
  }
`;
