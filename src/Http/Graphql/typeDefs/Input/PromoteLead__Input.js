const { gql } = require('apollo-server-express');

module.exports = gql`
  input PromoteLead__Address__Input {
    address: String
    countryCode: String
    city: String
    postCode: String
    state: String
  }

  input PromoteLead__Affiliate__Input {
    source: String
    referral: String
    sms: String
  }

  input PromoteLead__Configuration__Input {
    internalTransfer: Boolean
    crs: Boolean
    fatca: Boolean
  }

  input PromoteLead__Input {
    uuid: String!
    address: PromoteLead__Address__Input
    affiliate: PromoteLead__Affiliate__Input
    brandId: String
    birthDate: String
    configuration: PromoteLead__Configuration__Input
    firstName: String
    gender: String
    languageCode: String
    lastName: String
    password: String
  }
`;
