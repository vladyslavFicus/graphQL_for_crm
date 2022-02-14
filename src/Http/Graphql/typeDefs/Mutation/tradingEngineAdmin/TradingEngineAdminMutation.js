const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineAdminMutation {
    reopenOrder(
      orderId: Int!
    ): Boolean
    
    editOrder(args: TradingEngineEditOrderAdmin__Input): Boolean
    
    createSecurity(
      name: String!
      description: String
    ): Boolean
    
    editSecurity(
      name: String!
      description: String
      securityName: String!
    ): Boolean
    
    createSymbol(args: TradingEngineCreateSymbol__Input): Boolean

    editSymbol(args: TradingEngineEditSymbol__Input): Boolean
  }
`;
