const { gql } = require('apollo-server-express');

module.exports = gql`
  type EmailTemplateMutation {
    sendEmail(
      uuid: String!
      field: String!
      type: String!
      subject: String!
      templateName: String
      text: String!
    ): Boolean

    createEmailTemplate(
      name: String!
      subject: String!
      text: String!
    ): Boolean

    deleteEmailTemplate(
      id: ID!
    ): Boolean

    updateEmailTemplate(
      id: ID!
      name: String!
      subject: String!
      text: String!
    ): Boolean
  }
`;
