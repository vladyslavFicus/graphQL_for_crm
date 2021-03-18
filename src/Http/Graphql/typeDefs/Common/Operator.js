const { gql } = require('apollo-server-express');

module.exports = gql`
  type Operator__ClickToCall {
    didlogicPhone: String
    asteriskPhone: String
    commpeakPhone: String
  }

  type Operator {
    _id: ID!
    authorities(brand: String): [Authority]
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
    clickToCall: Operator__ClickToCall
    statusChangeAuthor: String
    statusChangeDate: String
    statusReason: String
    uuid: String
  }
`;
