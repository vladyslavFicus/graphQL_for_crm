const { gql } = require('apollo-server-express');

module.exports = gql`
  type PaymentSystem {
    paymentSystem: String
  }
`;
