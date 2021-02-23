const { gql } = require('apollo-server-express');

module.exports = gql`
  input ClientSearch__Input__Balance {
    from: Float
    to: Float
  }
  
  input ClientSearch__Input__Deposit {
    from: Int
    to: Int
  }

  input ClientSearch__Input__FirstDepositDateRange {
    from: String
    to: String
  }

  input ClientSearch__Input__FirstNoteDateRange {
    from: String
    to: String
  }

  input ClientSearch__Input__LastLoginDateRange {
    from: String
    to: String
  }

  input ClientSearch__Input__LastModificationDateRange {
    from: String
    to: String
  }

  input ClientSearch__Input__LastNoteDateRange {
    from: String
    to: String
  }

  input ClientSearch__Input__LastTradeDateRange {
    from: String
    to: String
  }

  input ClientSearch__Input__RegistrationDateRange {
    from: String
    to: String
  }

  input ClientSearch__Input {
    activityStatus: String
    acquisitionStatus: String
    affiliateUuids: [String]
    assignStatus: String
    balanceRange: ClientSearch__Input__Balance
    depositsCountRange: ClientSearch__Input__Deposit
    countries: [String]
    desks: [String]
    firstDepositDateRange: ClientSearch__Input__FirstDepositDateRange
    firstNoteDateRange: ClientSearch__Input__FirstNoteDateRange
    firstTimeDeposit: Boolean
    isReferrered: Boolean
    kycStatuses: [String]
    languages: [String]
    lastLoginDateRange: ClientSearch__Input__LastLoginDateRange
    lastModificationDateRange: ClientSearch__Input__LastModificationDateRange
    lastNoteDateRange: ClientSearch__Input__LastNoteDateRange
    lastTradeDateRange: ClientSearch__Input__LastTradeDateRange
    migrationId: String
    operators: [String]
    page: Page__Input
    registrationDateRange: ClientSearch__Input__RegistrationDateRange
    representativeUuids: [String]
    requestId: String
    retentionStatuses: [String]
    salesStatuses: [String]
    searchByAffiliateIdentifiers: String
    searchByIdentifiers: String
    searchLimit: Int
    statuses: [String]
    teams: [String]
    warnings: [String]
  }
`;
