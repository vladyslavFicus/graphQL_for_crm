const { gql } = require('apollo-server-express');

module.exports = gql`
  type PaymentStatistic__Entry {
    amount: Float!
    count: Int!
    entryDate: String!
  }

  type PaymentStatistic__Total {
    totalAmount: Float
    totalCount: Int
  }

  type PaymentStatistic__AdditionalTotal {
    totalAmount: Float
    totalCount: Int
    todayAmount: Float
    todayCount: Int
    monthAmount: Float
    monthCount: Int
  }

  type PaymentStatistic {
    items: [PaymentStatistic__Entry!]!
    itemsTotal: PaymentStatistic__Total
    additionalTotal: PaymentStatistic__AdditionalTotal
  }
`;
