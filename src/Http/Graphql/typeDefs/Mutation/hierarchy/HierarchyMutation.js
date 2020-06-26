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
  }
`;
