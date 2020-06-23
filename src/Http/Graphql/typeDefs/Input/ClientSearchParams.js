const { gql } = require('apollo-server-express');

module.exports = gql`
  input ClientSearchParams__Balance {
    from: Float
    to: Float
  }

  input ClientSearchParams__FirstDepositDateRange {
    from: String
    to: String
  }

  input ClientSearchParams__FirstNoteDateRange {
    from: String
    to: String
  }

  input ClientSearchParams__LastLoginDateRange {
    from: String
    to: String
  }

  input ClientSearchParams__LastModificationDateRange {
    from: String
    to: String
  }

  input ClientSearchParams__LastNoteDateRange {
    from: String
    to: String
  }

  input ClientSearchParams__LastTradeDateRange {
    from: String
    to: String
  }

  input ClientSearchParams__RegistrationDateRange {
    from: String
    to: String
  }

  input ClientSearchParams {
    activityStatus: String
    acquisitionStatus: String
    affiliateUuids: [String]
    assignStatus: String
    balanceRange: ClientSearchParams__Balance
    countries: [String]
    desks: [String]
    firstDepositDateRange: ClientSearchParams__FirstDepositDateRange
    firstNoteDateRange: ClientSearchParams__FirstNoteDateRange
    firstTimeDeposit: Boolean
    kycStatuses: [String]
    lastLoginDateRange: ClientSearchParams__LastLoginDateRange
    lastModificationDateRange: ClientSearchParams__LastModificationDateRange
    lastNoteDateRange: ClientSearchParams__LastNoteDateRange
    lastTradeDateRange: ClientSearchParams__LastTradeDateRange
    migrationId: String
    operators: [String]
    page: PageInputType
    registrationDateRange: ClientSearchParams__RegistrationDateRange
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
