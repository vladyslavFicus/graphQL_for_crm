const { gql } = require('apollo-server-express');

module.exports = gql`  
  type CurrencyRates {
    base: String!
    rates: Object!
  }
`;
