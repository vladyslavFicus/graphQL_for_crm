const FormData = require('form-data');
const { get } = require('lodash');
const fetch = require('../../../utils/fetch');
const readFile = require('../../../utils/readFile');
const parseJson = require('../../../utils/parseJson');
const buildQueryString = require('../../../utils/buildQueryString');
const { getTags } = require('./tags');

const getConditionalTags = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/conditional_tag/?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(async response => {
      if (typeof response === 'object' && !response.error) {
        let content = response.content;

        if (content.length) {
          const tagIds = content.map(({ tag }) => tag).filter(i => i);
          const tags = await getTags(
            null,
            {
              size: tagIds.length,
              page: 0,
              tagIds,
            },
            { headers: { authorization } }
          );
          const tagsContent = get(tags, 'data.content', []).reduce(
            (acc, curr) => ({ ...acc, [curr.tagId]: curr.tagName }),
            {}
          );

          content = content.map(({ tag, ...data }) => ({ ...data, tag: tagsContent[tag] || tag }));
        }

        return { data: { ...response, content } };
      }

      return { error: response };
    });
};

const addTags = async (_, { file, type, name, tag }, { headers: { authorization } }) => {
  const fileStream = await file;
  let bufferedFile = await readFile(fileStream);
  const formData = new FormData();

  formData.append('file', bufferedFile, fileStream.filename);
  formData.append('type', type);
  formData.append('tag', tag);
  formData.append('name', name);

  return fetch(`${global.appConfig.apiUrl}/conditional_tag/`, {
    method: 'POST',
    headers: {
      authorization,
      ...formData.getHeaders(),
    },
    body: formData,
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (response.uuid ? { data: response } : { error: response }));
};

const disable = function(_, { uuid, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/conditional_tag/${uuid}/disable?${buildQueryString(args)}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response =>
    response.status === 200
      ? {
          data: {
            uuid,
            conditionStatus: 'DISABLED',
          },
        }
      : {
          error: {
            error: 'error.conditional_tag.disable',
          },
        }
  );
};

module.exports = {
  getConditionalTags,
  addTags,
  disable,
};
