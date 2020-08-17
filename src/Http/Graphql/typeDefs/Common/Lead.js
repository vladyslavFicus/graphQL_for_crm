const { gql } = require('apollo-server-express');

module.exports = gql`
  type Lead {
    _id: ID!
    affiliate: String
    birthDate: String
    brandId: String!
    city: String
    convertedByOperatorUuid: String
    convertedToClientUuid: String
    country: String
    email: String!
    gender: String
    language: String
    lastNote: Note
    migrationId: String
    mobile: String
    name: String!
    phone: String!
    registrationDate: String!
    salesAgent: Operator
    salesStatus: SalesStatus__Enum
    status: String
    statusChangedDate: String
    source: String
    surname: String!
    uuid: String!
    acquisition: HierarchyUserAcquisition
  }
`;
