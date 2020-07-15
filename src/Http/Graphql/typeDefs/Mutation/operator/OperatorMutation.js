const { gql } = require('apollo-server-express');

module.exports = gql`
  type OperatorMutation {
    createOperator(
      branchId: String
      department: String!
      email: String!
      firstName: String!
      lastName: String!
      password: String!
      phone: String
      role: String!
      userType: String!
    ): Operator

    updateOperator(
      uuid: String!
      country: String
      firstName: String!
      lastName: String!
      phoneNumber: String
      sip: String
    ): Operator

    addExistingOperator(
      branchId: String
      department: String!
      email: String!
      role: String!
    ): Operator

    changeStatus(
      reason: String!
      status: String!
      uuid: String!
    ): Boolean

    addOperatorToBranch(
      branchId: String!
      operatorId: String!
    ): Boolean

    removeOperatorFromBranch(
      branchId: String!
      operatorId: String!
    ): Boolean

    updateOperatorUserType(
      operatorId: String!
      userType: String
    ): Boolean
  }
`;
