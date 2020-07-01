const { gql } = require('apollo-server-express');

module.exports = gql`
  type EmailTemplateMutation {
    sendEmail(
      subject: String!
      templateName: String
      text: String!
      toEmail: String!
    ): Email @response

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
