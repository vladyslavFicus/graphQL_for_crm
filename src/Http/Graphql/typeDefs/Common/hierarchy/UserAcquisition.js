const { gql } = require('apollo-server-express');

module.exports = gql`
  type HierarchyUserAcquisition {
    acquisitionStatus: String
    retentionOperator: Operator
    retentionRepresentative: String
    retentionStatus: String
    salesOperator: Operator
    salesRepresentative: String
    salesStatus: String
  }
`;
