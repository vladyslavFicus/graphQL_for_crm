const { gql } = require('apollo-server-express');

module.exports = gql`
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
    normalizedAmount: Float
  }

  type Referral__Remuneration {
    date: String
    amount: Float
    currency: String
    normalizedAmount: Float
  }

  type Referral {
    referralInfo: Referral__Info
    bonusType: Referral__BonusType__Enum
    acquisition: HierarchyUserAcquisition
    ftdInfo: Referral__FTD
    remuneration: Referral__Remuneration
  }
`;
