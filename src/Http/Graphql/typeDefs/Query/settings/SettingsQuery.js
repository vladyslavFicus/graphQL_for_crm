const { gql } = require('apollo-server-express');

module.exports = gql`
  type SettingsQuery {
    acquisitionStatuses(brandId: String!, args: AcquisitionStatuses__Input): [AcquisitionStatus!]!
  }
`;
