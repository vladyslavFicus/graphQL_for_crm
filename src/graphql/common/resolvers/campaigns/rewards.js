const fetch = require('../../../../utils/fetch');
const parseJson = require('../../../../utils/parseJson');
const asyncForEach = require('../../../../utils/asyncForEach');
const { wageringRequirementTypes, customValueFieldTypes } = require('../../../../constants/campaigns');

const addBonus = function(_, args, { headers: { authorization } }) {
  const data = { ...args };

  ['grantRatio', 'capping', 'prize'].forEach(key => {
    const absoluteValue = data[`${key}Absolute`];
    const percentageValue = data[`${key}Percentage`];

    if (absoluteValue || percentageValue) {
      const value = absoluteValue ? { value: absoluteValue } : { percentage: percentageValue };

      data[key] = {
        ratioType: absoluteValue ? customValueFieldTypes.ABSOLUTE : customValueFieldTypes.PERCENTAGE,
        ...value,
      };

      delete data[`${key}Absolute`];
      delete data[`${key}Percentage`];
    }
  });

  if (data.wageringRequirementType) {
    const value =
      data.wageringRequirementType === wageringRequirementTypes.ABSOLUTE
        ? { value: data.wageringRequirementAbsolute }
        : { percentage: data.wageringRequirementPercentage };

    data.wageringRequirement = { ratioType: data.wageringRequirementType, ...value };
    delete data.wageringRequirementType;
    delete data.wageringRequirementAbsolute;
    delete data.wageringRequirementPercentage;
  }

  return fetch(`${global.appConfig.apiUrl}/bonus_template/templates`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (response.uuid ? { data: response } : { error: response }));
};

const fetchBonusTemplate = function(_, { uuid }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/bonus_template/templates/${uuid}`, {
    method: 'GET',
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

const getBonusTemplates = async function(_, uuidList, headers) {
  const result = [];

  await asyncForEach(uuidList, async uuid => {
    const bonusAction = await fetchBonusTemplate(_, { uuid }, headers);

    if (!bonusAction.error) {
      result.push(bonusAction.data);
    }
  });

  return result;
};

const fetchFreeSpinTemplate = function(_, { uuid, aggregatorId }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/free_spin_template/templates/${aggregatorId}/${uuid}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => ({
      data: response.uuid ? { ...response } : null,
      error: response.error || null,
    }));
};

const getFreeSpinTemplates = async function(_, uuidList, headers) {
  const result = [];

  await asyncForEach(uuidList, async uuid => {
    const bonusAction = await fetchFreeSpinTemplate(_, { uuid }, headers);

    if (!bonusAction.error) {
      result.push(bonusAction.data);
    }
  });

  return result;
};

const getShortFreeSpinTemplates = async function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/free_spin_template/templates/short?status=CREATED`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text().then(text => ({ status: response.status, text })))
    .then(response => ({ ...response, json: parseJson(response.text) }))
    .then(response => (response.status === 200 ? response.json : []));
};

const getShortBonusTemplates = async function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/bonus_template/templates/short`, {
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

const getFreeSpinTemplateOptions = async function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/free_spin_template/templates`, {
    method: 'OPTIONS',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};

const addFreeSpinTemplate = function(_, { aggregatorId, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/free_spin_template/templates/${aggregatorId}`, {
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
    .then(response => ({
      data: !response.error ? { ...response } : null,
      error: response.error ? { error: response.error, fields_errors: response.fields_errors } : null,
    }));
};

module.exports = {
  fetchFreeSpinTemplate,
  getFreeSpinTemplates,
  fetchBonusTemplate,
  getBonusTemplates,
  addBonus,
  getShortFreeSpinTemplates,
  getShortBonusTemplates,
  getFreeSpinTemplateOptions,
  addFreeSpinTemplate,
};
