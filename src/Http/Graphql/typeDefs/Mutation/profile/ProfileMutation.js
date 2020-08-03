const { gql } = require('apollo-server-express');

module.exports = gql`
  type ProfileMutation {
    createProfile(args: CreateProfile__Input): CreatedProfile
    changeProfileStatus(playerUUID: String!, status: String!, reason: String!, comment: String): Profile
    updateConfiguration(playerUUID: String!, crs: Boolean, fatca: Boolean, internalTransfer: Boolean): Boolean
    updateKYCStatus(playerUUID: String!, kycStatus: String): Boolean
    updateEmail(playerUUID: String!, email: String): Profile
    verifyEmail(playerUUID: String!): Profile
    verifyPhone(playerUUID: String!, phone: String): Profile

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
      phone: String
      email: String
      additionalPhone: String
      additionalEmail: String
    ): Profile
  }
`;
