const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineGroup__GroupSecurity {
    security: TradingEngineSecurity!
    show: Boolean!
    defaultLots: Boolean!
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
    accountCreationAllowed: Boolean!
    groupName: String!
    description: String
    currency: String!
    defaultLeverage: Int!
    useSwap: Boolean!
    hedgeProhibited : Boolean!
    archivePeriodDays: Int!
    archiveMaxBalance: Int!
    archivationEnabled: Boolean!
    marginCallLevel: Int!
    enabled: Boolean!
    stopoutLevel: Int!
    groupSecurities: [TradingEngineGroup__GroupSecurity!]
    groupSymbols: [TradingEngineGroup__GroupSymbol!]
  }
`;
