const { gql } = require('apollo-server-express');

module.exports = gql`
  type SettingsMutation {
    createAcquisitionStatus(type: AcquisitionStatusTypes__Enum!, status: String!): Boolean
    deleteAcquisitionStatus(type: AcquisitionStatusTypes__Enum!, status: String!): Boolean
  }
`;
