const { gql } = require('apollo-server-express');

module.exports = gql`
  type PaymentMutation {
    createPayment(
      accountUUID: String
      amount: Float!
      country: String
      externalReference: String
      expirationDate: String
      login: Int
      paymentType: String!
      paymentMethod: String
      profileUUID: String
      source: String
      target: String
      paymentSystem: String
    ): Payment

    acceptPayment(
      declineReason: String
      paymentMethod: String
      paymentId: String!
      typeAcc: String!
    ): Boolean

    changePaymentMethod(
      paymentId: String!
      paymentMethod: String
    ): Boolean

    changePaymentStatus(
      paymentId: String!
      paymentStatus: String
    ): Boolean
    
    changePaymentSystem(
      paymentId: String!
      paymentSystem: String!
    ): Boolean

    changeOriginalAgent(
      paymentId: String!
      agentName: String
      agentId: String
    ): Boolean
    
    changeCreationTime(
      paymentId: String!
      creationTime: String!
    ): Boolean

    enableShowFtdToAffiliate(
        profileUuid: String!
    ): Boolean
      
    disableShowFtdToAffiliate(
        profileUuid: String!
    ): Boolean  

  }
`;
