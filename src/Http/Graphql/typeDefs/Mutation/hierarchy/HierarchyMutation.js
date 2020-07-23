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

    addBranchManager(
      branchUuid: String
      operatorUuid: String
    ): Boolean

    removeBranchManager(
      branchUuid: String
    ): Boolean

    updateUserAcquisition(
      salesRepresentative: String
      retentionRepresentative: String
      salesStatus: String
      retentionStatus: String
      type: String!
      isMoveAction: Boolean
      uuid: String!
    ): Boolean
  }
`;
