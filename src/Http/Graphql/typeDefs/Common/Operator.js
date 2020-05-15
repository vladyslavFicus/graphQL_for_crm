const { gql } = require('apollo-server-express');

module.exports = gql`
  type Operator {
    _id: ID!
    authorities: [Authority] @response
    country: String
    email: String
    firstName: String
    fullName: String
    hierarchy: HierarchyUser
    lastName: String
    operatorStatus: String
    phoneNumber: String
    registeredBy: String
    registrationDate: String
    sip: String
    statusChangeAuthor: String
    statusChangeDate: String
    statusReason: String
    uuid: String
  }
`;
