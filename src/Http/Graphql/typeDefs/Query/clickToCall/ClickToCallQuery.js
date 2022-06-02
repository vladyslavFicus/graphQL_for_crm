const { gql } = require('apollo-server-express');

module.exports = gql`
  type ClickToCallQuery {
    configs: [ClickToCallConfig!]!
  }
`;
