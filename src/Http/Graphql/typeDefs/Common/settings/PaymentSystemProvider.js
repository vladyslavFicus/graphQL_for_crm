const { gql } = require('apollo-server-express');

module.exports = gql`
  type PaymentSystemProvider {
    paymentSystem: String!
    isFavourite: Boolean
  }
`;
