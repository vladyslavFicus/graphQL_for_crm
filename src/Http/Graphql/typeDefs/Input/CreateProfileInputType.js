const { gql } = require('apollo-server-express');

module.exports = gql`
  input CreateProfileInputType__address {
    address: String
    countryCode: String
    city: String
    postCode: String
    state: String
  }

  input CreateProfileInputType__affiliate {
    source: String
    referral: String
    sms: String
  }

  input CreateProfileInputType__configuration {
    internalTransfer: Boolean
    crs: Boolean
    fatca: Boolean
  }

  input CreateProfileInputType__contacts {
    additionalEmail: String
    additionalPhone: String
    email: String
    phone: String
  }

  input CreateProfileInputType {
    address: CreateProfileInputType__address
    affiliate: CreateProfileInputType__affiliate
    brandId: String
    birthDate: String
    configuration: CreateProfileInputType__configuration
    contacts: CreateProfileInputType__contacts
    firstName: String
    gender: String
    languageCode: String
    lastName: String
    password: String
  }
`;
