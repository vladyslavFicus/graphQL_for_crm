const {
  getEmailTemplates: getEmailTemplatesRequest,
  createEmailTemplate: createEmailTemplateRequest,
  updateEmailTemplate: updateEmailTemplateRequest,
  deleteEmailTemplate: deleteEmailTemplateRequest,
  getEmailTemplate: getEmailTemplateRequest,
  sendEmail: sendEmailRequest,
} = require('../../../utils/emailTemplatesRequests');

const getEmailTemplates = (_, __, { headers: { authorization } }) => {
  return getEmailTemplatesRequest(authorization);
};

const getEmailTemplate = (_, args, { headers: { authorization } }) => {
  return getEmailTemplateRequest(args, authorization);
};

const createEmailTemplate = function(_, args, { headers: { authorization } }) {
  return createEmailTemplateRequest(args, authorization);
};

const updateEmailTemplate = function(_, args, { headers: { authorization } }) {
  return updateEmailTemplateRequest(args, authorization);
};

const deleteEmailTemplate = function(_, args, { headers: { authorization } }) {
  return deleteEmailTemplateRequest(args, authorization);
};

const sendEmail = function(_, args, { headers: { authorization } }) {
  return sendEmailRequest(args, authorization);
};

module.exports = {
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
  getEmailTemplates,
  getEmailTemplate,
  sendEmail,
};
