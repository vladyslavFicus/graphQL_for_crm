const FormData = require('form-data');
const fetch = require('../../../utils/fetch');
const parseJson = require('../../../utils/parseJson');
const buildQueryString = require('../../../utils/buildQueryString');
const Logger = require('../../../utils/logger');

const getFiles = function(_, { playerUUID, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/files/${playerUUID}?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => {
      Logger.info({
        message: `getFiles(playerUUID = ${playerUUID}) {\r\n  ${JSON.stringify({
          status: response.status,
          text: response.text,
        })}\r\n}`,
      });
      return response.text();
    })
    .then(response => parseJson(response))
    .then(response => {
      Logger.info({
        message: `getFiles(playerUUID = ${playerUUID}) {\r\n  ${JSON.stringify(response)}\r\n}`,
      });

      return response;
    });
};

const getFileList = async function(_, args, { headers: { authorization }, hierarchy }) {
  const customersIds = await hierarchy.getCustomersIds();

  return fetch(`${global.appConfig.apiUrl}/attachments/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ playerUUIDs: customersIds, ...args }),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

const updateFileStatus = async function(_, { fileUUID, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/files/${fileUUID}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const refuse = function(_, { uuid, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/files/${uuid}/status/refuse${buildQueryString(args)}`, {
    method: 'DELETE',
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

const deleteFile = function(_, { uuid, playerUUID }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/files/${playerUUID}/${uuid}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response =>
    response.status >= 200 && response.status < 300
      ? {
          data: {
            uuid,
          },
          error: null,
        }
      : {
          data: null,
          error: 'error.delete.file',
        }
  );
};

const uploadFile = async (_, { file }, { headers: { authorization }, brand: { id: brandId } }) => {
  const fileStream = await file;
  const result = await new Promise(resolve => {
    const buffs = [];
    const readStream = fileStream.createReadStream();
    readStream.on('data', d => {
      buffs.push(d);
    });
    readStream.on('end', () => {
      let bufferedFile = Buffer.concat(buffs);
      const formData = new FormData();
      formData.append('file', bufferedFile, fileStream.filename);
      formData.append('brandId', brandId);

      fetch(`${global.appConfig.apiUrl}/profile/files`, {
        method: 'POST',
        headers: {
          authorization,
          ...formData.getHeaders(),
        },
        body: formData,
      })
        .then(res => res.json())
        .then(response => resolve(response));
    });
  });

  if (!result.fileUUID) {
    return {
      error: result,
    };
  }

  return {
    data: {
      ...result,
      name: fileStream.filename,
      uuid: result.fileUUID,
    },
  };
};

const confirmFiles = function(_, { files, playerUUID }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/files/confirm/${playerUUID}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(
      files.reduce((acc, { name, uuid, category }) => {
        return {
          ...acc,
          [uuid]: {
            category,
            name,
          },
        };
      }, {})
    ),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (Array.isArray(response) ? { data: response } : { error: response }));
};

module.exports = {
  getFiles,
  deleteFile,
  refuse,
  uploadFile,
  verify,
  confirmFiles,
  getFileList,
  updateFileStatus,
};
