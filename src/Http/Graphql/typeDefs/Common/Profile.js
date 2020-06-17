const { gql } = require('apollo-server-express');

module.exports = gql`
  type Profile__Acquisition {
    acquisitionStatus: String
    retentionOperator: Operator
    retentionRepresentative: String
    retentionStatus: String
    salesOperator: Operator
    salesRepresentative: String
    salesStatus: String
  }

  type Profile__Address {
    address: String
    city: String
    countryCode: String
    postCode: String
    state: String
  }

  type Profile__Affiliate {
    uuid: String
    campaignId: String
    externalId: String
    partner: Partner
    referral: String
    source: String
    sms: String
  }

  type Profile__Configuration__GDPR {
    email: Boolean
    phone: Boolean
    sms: Boolean
    socialMedia: Boolean
  }

  type Profile__Configuration__SPAM {
    educational: Boolean
    information: Boolean
    marketNews: Boolean
    promosAndOffers: Boolean
    statisticsAndSummary: Boolean
  }

  type Profile__Configuration__WEBCOOKIE {
    enabled: Boolean
  }

  type Profile__Configuration {
    crs: Boolean
    fatca: Boolean
    internalTransfer: Boolean
    gdpr: Profile__Configuration__GDPR
    subscription: Profile__Configuration__SPAM
    webCookies: Profile__Configuration__WEBCOOKIE
  }

  type Profile__Contacts {
    additionalEmail: String
    additionalPhone: String
    email: String
    phone: String
  }

  type Profile__KYC {
    uuid: ID
    status: String
  }

  type Profile__Passport {
    countryOfIssue: String
    countrySpecificIdentifier: String
    countrySpecificIdentifierType: String
    expirationDate: String
    issueDate: String
    number: String
  }

  type Profile__RegistrationDetails__Device {
    deviceType: String
    operatingSystem: String
  }

  type Profile__RegistrationDetails__Inet {
    host: String
    ipAddress: String
    referer: String
  }

  type Profile__RegistrationDetails__Location {
    city: String
    countryCode: String
    region: String
  }

  type Profile__RegistrationDetails {
    deviceDetails: Profile__RegistrationDetails__Device
    inetDetails: Profile__RegistrationDetails__Inet
    locationDetails: Profile__RegistrationDetails__Location
    registeredBy: String
    registrationDate: String
    userAgent: String
  }

  type Profile__Status {
    changedAt: String
    changedBy: String
    comment: String
    reason: String
    type: String
  }

  type Profile {
    _id: ID!
    acquisition: Profile__Acquisition
    address: Profile__Address
    affiliate: Profile__Affiliate
    age: String
    birthDate: String
    brandId: String
    clientType: String
    configuration: Profile__Configuration
    contacts: Profile__Contacts
    convertedFromLeadUuid: String
    emailVerified: Boolean
    firstName: String
    gender: String
    identificationNumber: String
    kyc: Profile__KYC
    kycNote: Note
    languageCode: String
    lastName: String
    lastUpdatedBy: String
    lastUpdatedDate: String
    migrationId: String
    passport: Profile__Passport
    phoneVerified: Boolean
    profileVerified: Boolean
    profileView: ProfileView
    registrationDetails: Profile__RegistrationDetails
    status: Profile__Status
    timeZone: String
    tradingAccount: [TradingAccount]
    uuid: String
    verifications: [String]
  }
`;
