const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineGroup__GroupSecurity {
    security: TradingEngineSecurity!
    show: Boolean!
    spreadDiff: Int!
    lotMin: Float!
    lotMax: Float!
    lotStep: Float!
    commissionBase: Float!
    commissionType: Commission__Type__Enum!
    commissionLots: Commission__Lots__Enum!
  }

  type TradingEngineGroup__GroupSymbol {
    symbol: String!
    securityId: Int!
    percentage: Float!
    swapShort: Float!
    swapLong: Float!
    enabled: Boolean!
  }

  type TradingEngineGroup {
    enable: Boolean!
    groupName: String!
    description: String
    currency: String!
    defaultLeverage: Int!
    useSwap: Boolean!
    hedgeProhibited : Boolean!
    archivePeriodDays: Int!
    archiveMaxBalance: Int!
    marginCallLevel: Int!
    stopoutLevel: Int!
    groupSecurities: [TradingEngineGroup__GroupSecurity!]
    groupSymbols: [TradingEngineGroup__GroupSymbol!]
  }
`;
