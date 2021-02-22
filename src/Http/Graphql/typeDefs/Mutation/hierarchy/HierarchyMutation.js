const { gql } = require('apollo-server-express');

module.exports = gql`
  type HierarchyMutation {
    createOffice(
      name: String!
      country: String!
    ): Boolean

    createDesk(
      name: String!
      deskType: Desk__Types__Enum!
      language: String!
      officeId: String!
    ): Boolean

    createTeam(
      name: String!
      deskId: String!
    ): Boolean

    updateBranch(
      uuid: String!
      name: String!
      deskType: Desk__Types__Enum
      country: String
      language: String
    ): Boolean

    deleteBranch(uuid: String!): Boolean

    addBranchManager(
      branchUuid: String
      operatorUuid: String
    ): Boolean

    removeBranchManager(
      branchUuid: String
    ): Boolean

    updateAcquisition(
      uuid: String!
      parentOperator: String
      salesStatus: String
      retentionStatus: String
    ): Boolean

    bulkUpdateClientsAcquisition(
      uuids: [String]!
      parentOperators: [String]
      salesStatus: String
      retentionStatus: String
      searchParams: ClientSearch__Input
      sorts: [Sort__Input]
      bulkSize: Int
    ): Boolean

    bulkUpdateLeadsAcquisition(
      uuids: [String]!
      parentOperators: [String]
      salesStatus: String
      searchParams: LeadSearch__Input
      sorts: [Sort__Input]
      bulkSize: Int
    ): Boolean

    bulkUpdateAcquisitionStatus(
      uuids: [String]!
      acquisitionStatus: Desk__Types__Enum!
      searchParams: ClientSearch__Input
      sorts: [Sort__Input]
      bulkSize: Int
    ): Boolean
  }
`;
