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
    ): Payment @response

    acceptPayment(declineReason: String, paymentId: String!, paymentMethod: String, typeAcc: String!): Success @response
    changePaymentMethod(paymentId: String!, paymentMethod: String): Success @response
    changePaymentStatus(paymentId: String!, paymentStatus: String): Success @response
    changeOriginalAgent(paymentId: String!, agentId: String, agentName: String): Success
  }
`;
