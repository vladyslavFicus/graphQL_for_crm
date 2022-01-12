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
    
    createSymbol(args: TradingEngineCreateSymbolAdmin__Input): Boolean

    editSymbol(args: TradingEngineEditSymbolAdmin__Input): Boolean

    createGroup(args: TradingEngineCreateGroupAdmin__Input): Boolean
    
    editGroup(args: TradingEngineEditGroupAdmin__Input): Boolean
   
    deleteGroup(groupName: String!): Boolean
  }
`;
