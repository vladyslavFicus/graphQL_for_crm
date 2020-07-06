const { gql } = require('apollo-server-express');

module.exports = gql`
  type Schedule__CountrySpreads {
    country: String,
    limit: Int,
  }

  type Schedule {
    activated: Boolean,
    day: String,
    totalLimit: Int,
    countrySpreads: [Schedule__CountrySpreads],
    workingHoursFrom: String,
    workingHoursTo: String,
  }
`;
