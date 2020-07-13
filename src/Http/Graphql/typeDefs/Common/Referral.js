const { gql } = require('apollo-server-express');

module.exports = gql`
  type Referral__Info {
    profileUuid: String
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

  type Referral__Acquisition {

  }

  type Referral {
    # uuid
    # firstName
    # lastName
    # languageCode
    # address {
    #   countryCode
    # }
    referralInfo: Referral__Info
    bonusType: Referral__BonusType__Enum
    registrationDate: String
    acquisition: Referral__Acquisition
    ftdInfo: Referral__FTD
    remuneration: Referral__Remuneration
  }
`;
