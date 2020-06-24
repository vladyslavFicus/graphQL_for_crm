const { gql } = require('apollo-server-express');

module.exports = gql`
  type RegistrationStatistic__Additional__Field {
    value: Int
  }

  type RegistrationStatistic__Additional {
    total: RegistrationStatistic__Additional__Field
    month: RegistrationStatistic__Additional__Field
    today: RegistrationStatistic__Additional__Field
  }

  type RegistrationStatistic__Item {
    entries: Int
    entryDate: String
  }

  type RegistrationStatistic {
    additionalStatistics: RegistrationStatistic__Additional
    registrations: [RegistrationStatistic__Item]
  }
`;
