const fetch = require('../../../utils/fetch');
const buildQueryString = require('../../../utils/buildQueryString');
const parseJson = require('../../../utils/parseJson');
const { tagTypes } = require('../../../constants/tag');

const addTag = function(_, { playerUUID, priority, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/profiles/${playerUUID}/tags`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ tagPriority: priority, ...args }),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => {
      if (Array.isArray(response.profileTags)) {
        const addedTag = response.profileTags.find(
          ({ tag, tagPriority }) => tag === args.tag && priority === tagPriority
        );

        if (addedTag && addedTag.id) {
          return {
            data: {
              tag: args.tag,
              priority,
              id: addedTag.id,
            },
          };
        }
      }

      return {
        error: response,
      };
    });
};

const removeTag = function(_, { id, playerUUID }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/profile/profiles/${playerUUID}/tags/${id}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(
    response => (response.status === 200 ? { data: { id }, error: null } : { data: null, error: 'error.note.remove' })
  );
};

const unlinkTag = function(_, { tagId, targetUUID }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/tag/unlink/${tagId}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      targetUuids: [targetUUID],
    }),
  }).then(response => ({ success: response.status === 200 }));
};

const createTag = function(_, { targetUUID, pinned = false, ...args }, { headers: { authorization } }) {
  const params = {
    targets: [],
    content: '',
    ...args,
  };

  if (targetUUID) {
    params.targets = [
      {
        targetUuid: targetUUID,
        pinned,
      },
    ];
  }

  return fetch(`${global.appConfig.apiUrl}/tag/`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => ({
      data: response && response.created,
      error: typeof response === 'string' ? response : response && response.error,
    }));
};

const getTags = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/tag/tags?${buildQueryString({ tagType: tagTypes.TAG })}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (typeof response === 'object' && !response.error ? { data: response } : { error: response }));
};

const getTagsByText = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/tag/tags/byText?${buildQueryString({ tagType: tagTypes.TAG })}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (typeof response === 'object' && !response.error ? { data: response } : { error: response }));
};

const getPlayerTags = function(_, { playerUUID, ...args }, { headers: { authorization } }) {
  const queryParams = buildQueryString({
    ...args,
    tagType: tagTypes.TAG,
  });
  return fetch(`${global.appConfig.apiUrl}/tag/tags/${playerUUID}?${queryParams}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};

module.exports = {
  addTag,
  getTags,
  createTag,
  removeTag,
  getPlayerTags,
  unlinkTag,
  getTagsByText,
};
