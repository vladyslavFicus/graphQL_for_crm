const { gql } = require('apollo-server-express');

module.exports = gql`
  input RuleOperatorSpread__Input {
    parentUser: String
    percentage: Int
  }

  input RuleScheduleTimeInterval__Input {
    operatorSpreads: [RuleOperatorSpread__Input]
    timeFrom: String
    timeTo: String
  }

  input RuleSchedule__Input {
    days: [String]
    timeIntervals: [RuleScheduleTimeInterval__Input]
  }
`;
