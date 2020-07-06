const { gql } = require('apollo-server-express');

module.exports = gql`
  type ScheduleMutation {
    createSchedule(
      affiliateUuid: String!
      activated: Boolean
      day: String
      totalLimit: Int
      countrySpreads: [Schedule__Input]
      workingHoursFrom: String
      workingHoursTo: String
    ): Success
    changeScheduleStatus(
      affiliateUuid: String!
      data: [ScheduleStatus__Input],
    ): Success
  }
`;
