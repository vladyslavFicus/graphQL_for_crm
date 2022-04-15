const { gql } = require('apollo-server-express');

module.exports = gql`  
  type AcquisitionStatus {
    type: AcquisitionStatusTypes__Enum!
    status: String!
  }
`;
