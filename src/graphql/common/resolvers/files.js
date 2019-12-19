const FormData = require('form-data');
const fetch = require('../../../utils/fetch');
const parseJson = require('../../../utils/parseJson');
const buildQueryString = require('../../../utils/buildQueryString');
// const Logger = require('../../../utils/logger');

const getFiles = async (_, args, { headers: { authorization }, hierarchy }) => {
  const hierarchyUuids = await hierarchy.getCustomersIds();

  return fetch(`${global.appConfig.apiUrl}/attachments/search`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ hierarchyUuids, ...args }),
  }).then(response => response.json());
};

const getFilesByProfileUUID = (_, { clientUUID }, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/attachments/verification/users/${clientUUID}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const updateFileMeta = (_, { uuid, ...args }, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/attachments/admin/files/${uuid}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const deleteFile = (_, { uuid }, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/attachments/admin/files/${uuid}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const downloadFile = (_, { profileUUID, uuid }, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/attachments/users/${profileUUID}/files/${uuid}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getUserKYCStatus = ({ clientUuid }, _, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/attachments/verification/users/${clientUuid}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json().then(({ data }) => data));
};

const uploadFile = (_, { profileUUID, file }, { headers: { authorization } }) => {
  return new Promise(async resolve => {
    const { filename, createReadStream } = await file;
    const buffer = [];
    const stream = createReadStream();
    stream.on('data', chunk => {
      buffer.push(chunk);
    });
    stream.on('end', async () => {
      const formData = new FormData();
      formData.append('file', Buffer.concat(buffer), filename);

      const response = await fetch(`${global.appConfig.apiUrl}/attachments/users/${profileUUID}/files`, {
        method: 'POST',
        headers: {
          authorization,
          ...formData.getHeaders(),
        },
        body: formData,
      });

      resolve(response);
    });
  })
    .then(response => response.text())
    .then(data => ({ data: { fileUUID: data } }));
};

const confirmFilesUpload = (_, { profileUuid, ...args }, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/attachments/admin/users/${profileUuid}/files/confirm`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ data: { success: response.status === 200 } }));
};

const getFileCategoriesList = (_, __, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/attachments/verification/types/mapping`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const updateFileStatus = async function(_, { clientUuid, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/attachments/verification/users/${clientUuid}/status`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

// # Old
// Maybe this function are used for updating file
// const updateFileStatus = async function(_, { fileUUID, ...args }, { headers: { authorization } }) {
//   return fetch(`${global.appConfig.apiUrl}/profile/files/${fileUUID}`, {
//     method: 'PUT',
//     headers: {
//       accept: 'application/json',
//       authorization,
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify(args),
//   }).then(response => ({ success: response.status === 200 }));
// };

// # Old
// Don't understand why we should use this one
const verify = function(_, { uuid, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/files/${uuid}/status/verify?${buildQueryString(args)}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (response.uuid ? { data: response } : { error: response }));
};

module.exports = {
  getFiles,
  getFilesByProfileUUID,
  getFileCategoriesList,
  confirmFilesUpload,
  getUserKYCStatus, // will needed on Profile page -> Profile Tab
  updateFileMeta,
  downloadFile,
  uploadFile,
  deleteFile,

  verify,
  updateFileStatus,
};
