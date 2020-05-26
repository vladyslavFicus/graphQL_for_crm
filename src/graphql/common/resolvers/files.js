const FormData = require('form-data');
const fetch = require('../../../utils/fetch');
const getBaseUrl = require('../../../utils/getBaseUrl');

const getFiles = (_, args, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('attachments')}/search`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const getFilesByProfileUUID = (_, { clientUUID }, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('attachments')}/verification/users/${clientUUID}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const updateFileMeta = (_, { uuid, ...args }, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('attachments')}/admin/files/${uuid}`, {
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
  return fetch(`${getBaseUrl('attachments')}/admin/files/${uuid}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const downloadFile = (_, { profileUUID, uuid }, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('attachments')}/users/${profileUUID}/files/${uuid}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getUserKYCStatus = ({ clientUuid }, _, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('attachments')}/verification/users/${clientUuid}`, {
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

      const response = await fetch(`${getBaseUrl('attachments')}/users/${profileUUID}/files`, {
        method: 'POST',
        headers: {
          authorization,
          ...formData.getHeaders(),
        },
        body: formData,
      });

      resolve(response);
    });
  }).then(response => response.json());
};

const confirmFilesUpload = (_, { profileUuid, ...args }, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('attachments')}/admin/users/${profileUuid}/files/confirm`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ data: { success: response.status === 200 } }));
};

const getFileCategoriesList = async (_, __, { headers: { authorization } }) => {
  const { data } = await fetch(`${getBaseUrl('attachments')}/verification/types/mapping`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());

  if (data) {
    return {
      data: {
        ...data,
        ADDRESS_VERIFICATION: [
          ...data.ADDRESS_VERIFICATION.filter(docType => {
            return docType !== 'PASSPORT' && docType !== 'EMPLOYER_LETTER';
          }),
        ],
      },
    };
  }

  return {};
};

const updateFileStatus = async (_, { clientUuid, ...args }, { headers: { authorization } }) => {
  return fetch(`${getBaseUrl('attachments')}/verification/users/${clientUuid}/status`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

module.exports = {
  getFiles,
  getFilesByProfileUUID,
  getFileCategoriesList,
  confirmFilesUpload,
  getUserKYCStatus,
  updateFileMeta,
  downloadFile,
  uploadFile,
  deleteFile,
  updateFileStatus,
};
