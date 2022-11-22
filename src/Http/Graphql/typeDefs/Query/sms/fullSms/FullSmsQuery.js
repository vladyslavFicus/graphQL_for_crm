const { gql } = require('apollo-server-express');

module.exports = gql`
  type FullSmsQuery {
    numbers: [FullSms__Number!]
  }
`;
