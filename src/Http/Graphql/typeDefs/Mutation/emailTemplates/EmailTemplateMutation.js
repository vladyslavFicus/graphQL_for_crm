const { gql } = require('apollo-server-express');

module.exports = gql`
  type EmailTemplateMutation {
    sendEmail(subject: String!, templateName: String, text: String!, toEmail: String!): Email @response
    createEmailTemplate(name: String!, subject: String!, text: String!): Email @response
    deleteEmailTemplate(id: ID!): Email @response
    updateEmailTemplate(id: ID!, name: String!, subject: String!, text: String!): Email @response
  }
`;
