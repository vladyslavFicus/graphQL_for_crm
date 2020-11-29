const { gql } = require('apollo-server-express');

module.exports = gql`  
  type Rule__OperatorSpread {
    id: Int!
    operator: Operator
    parentUser: String
    percentage: Int
  }

  type Rule__Action {
    id: Int!
    operatorSpreads: [Rule__OperatorSpread]
    parentBranch: String
    parentUser: String
    ruleType: Rule__ActionType__Enum
  }

  type RuleTimeInterval {
    operatorSpreads: [Rule__OperatorSpread]
    timeFrom: String
    timeTo: String
  }

  type RuleSchedule {
    days: [String]
    timeIntervals: [RuleTimeInterval]
  }

  type Rule {
    actions: [Rule__Action]
    brandId: String
    countries: [String]
    createdAt: String
    createdBy: String
    deletedAt: String
    languages: [String]
    name: String
    partners: [Partner]
    priority: Int!
    sources: [String]
    type: Rule__Type__Enum
    updatedBy: String
    uuid: String!
    enableScheduling: Boolean
    schedules: [RuleSchedule]
  }
`;
