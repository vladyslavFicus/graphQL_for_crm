const { gql } = require('apollo-server-express');

module.exports = gql`  
  type Rule__OperatorSpread {
    operator: Operator
    parentUser: String!
    percentage: Int!
  }

  type RuleTimeInterval {
    operatorSpreads: [Rule__OperatorSpread!]!
    timeFrom: String!
    timeTo: String!
  }

  type RuleSchedule {
    days: [String!]!
    timeIntervals: [RuleTimeInterval!]!
  }

  type Rule {
    parentBranch: String
    operatorSpreads: [Rule__OperatorSpread!]
    brandId: String
    countries: [String!]
    createdAt: String
    createdBy: String
    deletedAt: String
    languages: [String!]
    name: String
    partners: [Partner!]!
    priority: Int!
    sources: [String!]
    type: Rule__Type__Enum
    updatedBy: String
    uuid: String!
    enableSchedule: Boolean
    schedules: [RuleSchedule!]
  }
`;
