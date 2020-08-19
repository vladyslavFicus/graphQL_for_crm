const { gql } = require('apollo-server-express');

module.exports = gql`
  type LeadMutation {
    update(
      uuid: String!
      name: String
      surname: String
      phone: String
      mobile: String
      email: String
      country: String
      birthDate: String
      gender: String
      city: String
    ): Boolean

    uploadLeads(file: Upload): Boolean
  }
`;
