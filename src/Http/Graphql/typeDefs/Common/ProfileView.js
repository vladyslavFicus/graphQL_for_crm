const { gql } = require('apollo-server-express');

module.exports = gql`
  type ProfileView__Acquisition {
    acquisitionStatus: String
    retentionOperator: Operator
    retentionRepresentative: String
    retentionStatus: String
    salesOperator: Operator
    salesRepresentative: String
    salesStatus: String
  }

  type ProfileView__Address {
    countryCode: String
  }

  type ProfileView__Affiliate {
    campaignId: String
    partner: Partner
    source: String
    uuid: String!
  }

  type ProfileView__Referrer {
    uuid: String
    fullName: String
  }

  type ProfileView__Balance {
    amount: String
    credit: String
    currency: String
  }

  type ProfileView__LastActivity {
    date: String
    location: String
    eventType: String
    eventValue: String
    application: String
  }

  type ProfileView__PaymentDetails {
    depositsCount: Int
    lastDepositTime: String
  }

  type ProfileView__RegistrationDetails {
    registeredBy: String
    registrationDate: String
  }

  type ProfileView__Sessions {
    countryCode: String
    ip: String
    startedAt: String
  }

  type ProfileView__Status {
    changedAt: String
    type: String
  }

  type ProfileView {
    acquisition: ProfileView__Acquisition
    address: ProfileView__Address
    affiliate: ProfileView__Affiliate
    referrer: ProfileView__Referrer
    balance: ProfileView__Balance
    firstName: String
    fullName: String
    languageCode: String!
    lastActivity: ProfileView__LastActivity
    lastName: String
    lastNote: Note
    lastSignInSessions: [ProfileView__Sessions]
    paymentDetails: ProfileView__PaymentDetails
    registrationDetails: ProfileView__RegistrationDetails
    status: ProfileView__Status
    uuid: String!
    warnings: [String]
    online: Boolean
  }
`;
