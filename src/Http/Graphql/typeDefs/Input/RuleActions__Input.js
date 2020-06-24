const { gql } = require('apollo-server-express');

module.exports = gql`
  input RuleActions__OperatorSpread__Input {
    parentUser: String
    percentage: Int
  }

  input RuleActions__Input {
    operatorSpreads: [RuleActions__OperatorSpread__Input]
    parentBranch: String
    parentUser: String
    ruleType: Rule__ActionType__Enum
  }
`;
