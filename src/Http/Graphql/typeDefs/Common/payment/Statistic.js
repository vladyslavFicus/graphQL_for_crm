const { gql } = require('apollo-server-express');

module.exports = gql`
  type PaymentGeneralStatistic__PaymentStats {
    totalAmount: Float!
    totalCount: Int!
    first: String
    last: String
  }

  type PaymentsGeneralStatistics {
    withdrawals: PaymentGeneralStatistic__PaymentStats!
    deposits: PaymentGeneralStatistic__PaymentStats!
  }
`;
