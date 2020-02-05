const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');

const {
  emailTemplates: { createEmailTemplate, updateEmailTemplate, deleteEmailTemplate, sendEmail },
} = require('../../common/resolvers');

const { ResponseType } = require('../../common/types');
const EmailType = require('../../query/EmailType');

const EmailTemplatesMutation = new GraphQLObjectType({
  name: 'EmailTemplatesMutation',
  fields: () => ({
    sendEmail: {
      args: {
        templateName: { type: GraphQLString },
        subject: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        toEmail: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(EmailType, 'SendEmail'),
      resolve: sendEmail,
    },
    createEmailTemplate: {
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        subject: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(EmailType, 'CreateEmailTemplate'),
      resolve: createEmailTemplate,
    },
    updateEmailTemplate: {
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        subject: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(EmailType, 'UpdateEmailTemplate'),
      resolve: updateEmailTemplate,
    },
    deleteEmailTemplate: {
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      type: ResponseType(EmailType, 'DeleteEmailTemplate'),
      resolve: deleteEmailTemplate,
    },
  }),
});

module.exports = EmailTemplatesMutation;
