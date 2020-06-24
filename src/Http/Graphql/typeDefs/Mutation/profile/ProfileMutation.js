const { gql } = require('apollo-server-express');

module.exports = gql`
  type ProfileMutation {
    createProfile(args: CreateProfileInputType): CreatedProfile
    changeProfileStatus(playerUUID: String!, status: String!, reason: String!, comment: String): Profile @response
    updateConfiguration(playerUUID: String!, crs: Boolean, fatca: Boolean, internalTransfer: Boolean): Success
    updateKYCStatus(playerUUID: String!, kycStatus: String): Success
    updateEmail(playerUUID: String!, email: String): Profile
    verifyEmail(playerUUID: String!): Profile @response
    verifyPhone(playerUUID: String!, phone: String): Profile @response

    bulkClientUpdate(
      salesRepresentative: [String]
      retentionRepresentative: [String]
      salesStatus: String
      retentionStatus: String
      type: String!
      isMoveAction: Boolean
      clients: [ClientToUpdateInput]
      allRowsSelected: Boolean
      totalElements: Int
      searchParams: ClientSearchParams
    ): Boolean

    updatePersonalInformation(
      playerUUID: String!
      firstName: String
      lastName: String
      birthDate: String
      gender: String
      identificationNumber: String
      languageCode: String
      passport: PassportInput
      timeZone: String
    ): Profile @response

    updateAddress(
      playerUUID: String!
      countryCode: String
      state: String
      city: String
      address: String
      postCode: String
    ): Profile @response

    updateContacts(
      playerUUID: String!
      phone: String
      email: String
      additionalPhone: String
      additionalEmail: String
    ): Profile @response
  }
`;
