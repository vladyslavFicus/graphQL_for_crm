const { gql } = require('apollo-server-express');

module.exports = gql`
  input PartnerSchedule__Input {
    country: String
    limit: Int
  }
  
  input PartnerScheduleStatus__Input {
    activated: Boolean
    day: String
  }
`;
