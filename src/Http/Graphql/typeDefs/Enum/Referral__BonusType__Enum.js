const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Referral__BonusType__Enum {
    REGISTRATION
    FTD
  }
`;
