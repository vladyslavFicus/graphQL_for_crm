const { gql } = require('apollo-server-express');

module.exports = gql`
  enum AcquisitionStatusTypes__Enum {
    SALES
    RETENTION
  }
`;
