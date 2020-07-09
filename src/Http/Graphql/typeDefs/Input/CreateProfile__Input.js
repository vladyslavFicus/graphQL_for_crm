const { gql } = require('apollo-server-express');

module.exports = gql`
  input CreateProfile__Address__Input {
    address: String
    countryCode: String
    city: String
    postCode: String
    state: String
  }

  input CreateProfile__Affiliate__Input {
    source: String
    referral: String
    sms: String
  }

  input CreateProfile__Configuration__Input {
    internalTransfer: Boolean
    crs: Boolean
    fatca: Boolean
  }

  input CreateProfile__Contacts__Input {
    additionalEmail: String
    additionalPhone: String
    email: String
    phone: String
  }

  input CreateProfile__Input {
    address: CreateProfile__Address__Input
    affiliate: CreateProfile__Affiliate__Input
    brandId: String
    birthDate: String
    configuration: CreateProfile__Configuration__Input
    contacts: CreateProfile__Contacts__Input
    firstName: String
    gender: String
    languageCode: String
    lastName: String
    password: String
  }
`;
