const { gql } = require('apollo-server-express');

module.exports = gql`
  input PaymentStatisticDatesInput {
    dateFrom: String
    dateTo: String
  }
`;
