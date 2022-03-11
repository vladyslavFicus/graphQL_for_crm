const { gql } = require('apollo-server-express');

module.exports = gql`
input TradingEngineCreateOperator__Input {
  firstName: String!,
  lastName: String!,
  email: String!,
  phone: String,
  password: String!,
  role: String!,
  groupNames: [String],
}
`;
