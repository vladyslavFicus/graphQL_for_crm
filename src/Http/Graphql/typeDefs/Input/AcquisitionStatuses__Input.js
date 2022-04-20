const { gql } = require('apollo-server-express');

module.exports = gql`
  input AcquisitionStatuses__Input {
    statusName: String
    type: AcquisitionStatusTypes__Enum
  }
`;
