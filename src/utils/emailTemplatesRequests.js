const fetch = require('./fetch');

const sendEmail = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/email/templated-email`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const getEmailTemplate = ({ id }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/email/templates/${id}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getEmailTemplates = authorization => {
  return fetch(`${global.appConfig.apiUrl}/email/templates`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const createEmailTemplate = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/email/templates`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const updateEmailTemplate = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/email/templates`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const deleteEmailTemplate = function({ id }, authorization) {
  console.log('id: ', id);
  return fetch(`${global.appConfig.apiUrl}/email/templates/${id}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => (response.status === 204 ? { data: { id } } : { error: 'error.template.delete' }));
};

module.exports = {
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
  getEmailTemplates,
  getEmailTemplate,
  sendEmail,
};
