const { gql } = require('apollo-server-express');

module.exports = gql`
  enum PlatformType__Enum {
    MT4
    MT5
    TE
    WET
  }

  type PlatformMaxAccounts {
    platformType: PlatformType__Enum!
    maxLiveAccounts: Int!
  }

  type PaymentDeposit {
    min: Int!
    max: Int!
    currency: String!
  }

  type AccountAutoCreation {
    accountCurrency: String!
    createOnRegistration: Boolean!
    platformType: PlatformType__Enum!
  }

  type FeatureToggles {
    restrictedCountries: [String!]!
    paymentAmounts: [Float!]!
    platformMaxAccounts: [PlatformMaxAccounts!]
    notificationCleanUpDays: Int
    hideChangePasswordCp: Boolean
    paymentDeposits: [PaymentDeposit!]
    referralEnable: Boolean
    jwtAccessTtlSeconds: Int
    accountAutoCreations: [AccountAutoCreation!]
    profileDepositEnable: Boolean
    version: Int!
  }
`;
