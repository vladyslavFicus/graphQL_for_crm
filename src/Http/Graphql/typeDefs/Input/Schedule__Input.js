const { gql } = require('apollo-server-express');

module.exports = gql`
  input Schedule__Input {
    country: String
    limit: Int
  }
  
  input ScheduleStatus__Input {
    activated: Boolean
    day: String
  }
`;
