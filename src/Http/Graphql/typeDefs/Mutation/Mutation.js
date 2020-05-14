const { gql } = require('apollo-server-express');

module.exports = gql`
  type Mutation {
    asterisk: AsteriskMutation @nested
  }
`;
