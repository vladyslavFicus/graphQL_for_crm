const { gql } = require('apollo-server-express');

module.exports = gql`
  enum SalesStatus__Enum {
    CALLBACK
    CONVERTED
    DEPOSITOR
    DO_NOT_CALL
    DUPLICATE
    FAILED_DEPOSIT
    INITIAL_CALL
    INVALID_COUNTRY
    INVALID_LANGUAGE
    NEVER_ANSWER
    NEW
    NO_ANSWER
    NO_ANSWER_2
    NO_ANSWER_3
    NO_ANSWER_4
    NO_ANSWER_5
    NO_INTEREST
    NO_MONEY
    POTENTIAL_HIGH
    POTENTIAL_LOW
    REASSIGN
    TEST
    UNDER_18
    VOICEMAIL
    WRONG_INFO
    WRONG_NUMBER
    FROST
    REFERRAL
    ACTIVE
  }
`;
