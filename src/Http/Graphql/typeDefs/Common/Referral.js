const { gql } = require('apollo-server-express');

module.exports = gql`
  type Referral__Acquisition {
    acquisitionStatus: String
    retentionOperator: Operator
    retentionRepresentative: String
    retentionStatus: String
    salesOperator: Operator
    salesRepresentative: String
    salesStatus: String
  }

  type Referral__Info {
    name: String
    profileUuid: String
    languageCode: String
    countryCode: String
    registrationDate: String
  }

  type Referral__FTD {
    date: String
    amount: Float
    currency: String
    normalizedAmount: String
  }

  type Referral__Remuneration {
    date: String
    amount: Float
    currency: String
    normalizedAmount: String
  }

  type Referral {
    referralInfo: Referral__Info
    bonusType: Referral__BonusType__Enum
    acquisition: Referral__Acquisition
    ftdInfo: Referral__FTD
    remuneration: Referral__Remuneration
  }
`;
