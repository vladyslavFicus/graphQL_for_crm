const { gql } = require('apollo-server-express');

module.exports = gql`
  type ProfileMutation {
    createProfile(args: CreateProfile__Input): Boolean
    changeProfileStatus(playerUUID: String!, status: String!, reason: String!, comment: String): Profile
    updateConfiguration(playerUUID: String!, crs: Boolean, fatca: Boolean, internalTransfer: Boolean): Boolean
    updateKYCStatus(playerUUID: String!, kycStatus: String): Boolean
    updateEmail(
      playerUUID: String!
      email: String @auth_hide_argument(action: "profile.field.email")
    ): Profile
    verifyEmail(playerUUID: String!): Profile
    verifyPhone(playerUUID: String!): Profile
    updateConfigurationDeposit(
      playerUUID: String!
      enabled: Boolean!
    ): Profile__Configuration

    updatePersonalInformation(
      playerUUID: String!
      firstName: String
      lastName: String
      birthDate: String
      gender: String
      identificationNumber: String
      languageCode: String
      passport: Passport__Input
      timeZone: String
    ): Profile

    updateAddress(
      playerUUID: String!
      countryCode: String
      state: String
      city: String
      address: String
      postCode: String
      poBox: String
    ): Profile

    updateContacts(
      playerUUID: String!
      phone: String @auth_hide_argument(action: "profile.field.phone")
      email: String @auth_hide_argument(action: "profile.field.email")
      additionalPhone: String @auth_hide_argument(action: "profile.field.additionalPhone")
      additionalEmail: String @auth_hide_argument(action: "profile.field.additionalEmail")
    ): Profile
  }
`;
