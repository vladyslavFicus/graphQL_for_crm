const { gql } = require('apollo-server-express');

module.exports = gql`
  input PaymentStatisticDateRange__Input {
    dateFrom: String
    dateTo: String
  }
`;
