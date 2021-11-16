const { gql } = require('apollo-server-express');

module.exports = gql`
  type TradingEngineAdminMutation {
    reopenOrder(
      orderId: Int!
    ): Boolean
    
    editOrder(args: TradingEngineEditOrderAdmin__Input): Boolean
    createSecurities(
      name: String!
      description: String
    ): Boolean
  }
`;
