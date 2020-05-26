const fetch = require('./fetch');
const getBaseUrl = require('./getBaseUrl');

const updateNotificationCenterRequest = (args, authorization) => {
  return fetch(`${getBaseUrl('notification')}/admin/notifications/bulk/read`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const getNotificationCenterRequest = ({ hierarchical, ...args }, authorization) => {
  return fetch(`${getBaseUrl('notification')}/admin/notifications/search?hierarchical=${hierarchical}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const getNotificationCenterTypesRequest = authorization => {
  return fetch(`${getBaseUrl('notification')}/admin/notifications/types`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getNotificationCenterSubtypesRequest = authorization => {
  return fetch(`${getBaseUrl('notification')}/admin/notifications/subtypes`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getNotificationCenterUnreadRequest = authorization => {
  return fetch(`${getBaseUrl('notification')}/admin/notifications/unread/amount`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

module.exports = {
  updateNotificationCenterRequest,
  getNotificationCenterRequest,
  getNotificationCenterTypesRequest,
  getNotificationCenterUnreadRequest,
  getNotificationCenterSubtypesRequest,
};
