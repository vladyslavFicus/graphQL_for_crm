const fetch = require('./fetch');
const getBaseUrl = require('./getBaseUrl');

const sendEmail = (args, authorization) => {
  return fetch(`${getBaseUrl('email')}/templated-email`, {
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
  return fetch(`${getBaseUrl('email')}/templates/${id}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getEmailTemplates = authorization => {
  return fetch(`${getBaseUrl('email')}/templates`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const createEmailTemplate = (args, authorization) => {
  return fetch(`${getBaseUrl('email')}/templates`, {
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
  return fetch(`${getBaseUrl('email')}/templates`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const deleteEmailTemplate = ({ id }, authorization) => {
  return fetch(`${getBaseUrl('email')}/templates/${id}`, {
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
