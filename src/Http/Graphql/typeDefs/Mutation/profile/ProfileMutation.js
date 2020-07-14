const { gql } = require('apollo-server-express');

module.exports = gql`
  type ProfileMutation {
    createProfile(
      args: CreateProfile__Input
    ): Boolean

    changeProfileStatus(
      playerUUID: String!
      comment: String
      status: String!
      reason: String!
    ): Profile

    updateConfiguration(
      internalTransfer: Boolean
      playerUUID: String!
      fatca: Boolean
      crs: Boolean
    ): Boolean

    updateKYCStatus(
      playerUUID: String!
      kycStatus: String
    ): Boolean

    updateEmail(
      playerUUID: String!
      email: String
    ): Profile

    verifyEmail(
      playerUUID: String!
    ): Profile

    verifyPhone(
      playerUUID: String!
      phone: String
    ): Profile

    bulkClientUpdate(
      salesRepresentative: [String]
      retentionRepresentative: [String]
      salesStatus: String
      retentionStatus: String
      type: String!
      isMoveAction: Boolean
      clients: [ClientUpdate__Input]
      allRowsSelected: Boolean
      totalElements: Int
      searchParams: ClientSearch__Input
    ): Boolean

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
