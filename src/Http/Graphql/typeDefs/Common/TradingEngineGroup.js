const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineGroup__GroupSecurities {
    security: TradingEngineSecurity
    show: Boolean
    spreadDiff: Int
    lotMin: Float
    lotMax: Float
    lotStep: Float
    commissionBase: Float
    commissionType: Commission_Type_Enum
    commissionLots: Commission_Lots_Enum
  }

  type TradingEngineGroup__GroupMargins {
    symbol: String
    percentage: Int
    swapShort: Float
    swapLong: Float
  }

  type TradingEngineGroup {
    enable: Boolean
    groupName: String!
    description: String
    currency: String!
    defaultLeverage: Int
    useSwap: Boolean
    hedgeProhibited : Boolean
    archivePeriodDays: Int
    archiveMaxBalance: Int
    marginCallLevel: Int
    stopoutLevel: Int
    groupSecurities: [TradingEngineGroup__GroupSecurities]
    groupMargins: [TradingEngineGroup__GroupMargins]
  }
`;
