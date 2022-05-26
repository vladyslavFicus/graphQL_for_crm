const { gql } = require('apollo-server-express');

module.exports = gql`
  type Lead__LastCall {
    operatorUuid: String
    callSystem: String
    date: String
  }
  
  type Lead__Contacts {
    email: String! @auth_mask_field(action: "lead.field.email", maskAll: true)
    phone: String! @auth_mask_field(action: "lead.field.phone", maskAll: true)
    mobile: String @auth_mask_field(action: "lead.field.mobile", maskAll: true)
  }

  type Lead {
    _id: ID!
    affiliate: String
    birthDate: String
    brandId: String!
    city: String
    convertedByOperatorUuid: String
    convertedToClientUuid: String
    country: String
    email: String! @mask_field
    gender: String
    language: String
    lastNote: Note
    migrationId: String
    mobile: String @mask_field
    name: String!
    phone: String! @mask_field
    registrationDate: String!
    salesAgent: Operator
    salesStatus: SalesStatus__Enum
    status: String
    statusChangedDate: String
    source: String
    surname: String!
    uuid: String!
    acquisition: HierarchyUserAcquisition
    lastCall: Lead__LastCall
  }
`;
