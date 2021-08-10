const { gql } = require('apollo-server-express');

module.exports = gql`
  type SmsQuery {
    coperato: CoperatoSmsQuery @nested
  }
`;
