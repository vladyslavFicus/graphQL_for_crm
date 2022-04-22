const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Click2CallCustomer__Type__Enum {
    PROFILE
    LEAD
  }
`;
