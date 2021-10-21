const { gql } = require('apollo-server-express');

module.exports = gql`
  type ProfileView__Address {
    countryCode: String
  }
  
  type ProfileView__Affiliate__FTD {
    time: String
    amount: Float
    currency: String
    isVisible: Boolean
  }

  type ProfileView__Affiliate {
    uuid: String @auth_hide_field(action: "profile.affiliate.field.uuid")
    campaignId: String @auth_hide_field(action: "profile.affiliate.field.campaignId")
    partner: Partner @auth_hide_field(action: "profile.affiliate.field.uuid")
    source: String @auth_hide_field(action: "profile.affiliate.field.source")
    ftd: ProfileView__Affiliate__FTD
  }

  type ProfileView__Referrer {
    uuid: String @auth_hide_field(action: "profile.referrer.field.uuid")
    fullName: String @auth_hide_field(action: "profile.referrer.field.fullName")
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
    acquisition: HierarchyUserAcquisition
    address: ProfileView__Address
    affiliate: ProfileView__Affiliate
    referrer: ProfileView__Referrer
    balance: ProfileView__Balance @auth_hide_field(action: "profile.field.balance")
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
