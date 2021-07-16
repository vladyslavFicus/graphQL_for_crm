const { gql } = require('apollo-server-express');

module.exports = gql`
  type CoperatoSmsQuery {
    numbers: [CoperatoSms__Number]
  }
`;
