const { gql } = require('apollo-server-express');

module.exports = gql`
  input AcquisitionStatuses__Input {
    type: AcquisitionStatusTypes__Enum
  }
`;
