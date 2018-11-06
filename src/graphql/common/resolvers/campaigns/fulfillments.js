const fetch = require('../../../../utils/fetch');
const parseJson = require('../../../../utils/parseJson');

const getWageringFulfillmentByUUID = function(_, { uuid }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/wagering_fulfillment/${uuid}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (response.error ? { error: response } : { data: response }));
};

const addWageringFulfillment = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/wagering_fulfillment/`, {
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
    .then(response => (response.uuid ? { data: response } : { error: response }));
};

const createGamingFulfillmentMutation = httpMethod =>
  function(_, { uuid, ...args }, { headers: { authorization } }) {
    return fetch(`${global.appConfig.apiUrl}/gaming_fulfillment/${uuid || ''}`, {
      method: httpMethod,
      headers: {
        accept: 'application/json',
        authorization,
        'content-type': 'application/json',
      },
      body: JSON.stringify(args),
    })
      .then(response => response.text())
      .then(response => parseJson(response))
      .then(response => (response.uuid ? { data: response } : { error: response }));
  };

const getDepositFulfillmentByUUID = function(_, { uuid }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/deposit_fulfillment/${uuid}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (response.error ? { error: response } : { data: response }));
};

const getDepositFulfillmentsByUUIDs = function(_, { uuids }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/deposit_fulfillment/?uuids=${uuids.join(',')}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (Array.isArray(response) ? response : []));
};

const getWageringFulfillmentByUUIDs = function(_, { uuids }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/wagering_fulfillment/?uuids=${uuids.join(',')}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (Array.isArray(response) ? response : []));
};

const getGamingsFulfillmentByUUIDs = function(_, { uuids }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/gaming_fulfillment/?uuids=${uuids.join(',')}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (Array.isArray(response) ? response : []));
};

const createDepositFulfillmentMutation = httpMethod =>
  function(_, { minAmount, maxAmount, uuid, ...args }, { headers: { authorization } }) {
    let error = {
      error: null,
      fields_errors: {},
    };

    if (!minAmount) {
      error = {
        error: 'error.validation',
        fields_errors: {
          minAmount: { error: 'error.validation.field.empty' },
        },
      };
    }

    if (error.error) {
      return { error };
    }

    const requestBody = { ...args };
    const maxAmountByCurrency = maxAmount
      ? maxAmount.reduce((res, item) => ({ ...res, [item.currency]: item.amount }), {})
      : {};

    requestBody.amounts = minAmount.map(item => ({
      min: item.amount,
      max: maxAmount ? maxAmountByCurrency[item.currency] : null,
      currency: item.currency,
    }));

    if (requestBody.excludedPaymentMethods && requestBody.excludedPaymentMethods.length === 0) {
      requestBody.excludedPaymentMethods = undefined;
    }

    return fetch(`${global.appConfig.apiUrl}/deposit_fulfillment/${uuid || ''}`, {
      method: httpMethod,
      headers: {
        accept: 'application/json',
        authorization,
        'content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.text())
      .then(response => parseJson(response))
      .then(response => (response.error ? { error: response } : { data: response }));
  };

module.exports = {
  addWageringFulfillment,
  getWageringFulfillmentByUUID,
  getDepositFulfillmentByUUID,
  getDepositFulfillmentsByUUIDs,
  getWageringFulfillmentByUUIDs,
  getGamingsFulfillmentByUUIDs,
  addGamingFulfillment: createGamingFulfillmentMutation('POST'),
  updateGamingFulfillment: createGamingFulfillmentMutation('PUT'),
  addDepositFulfillment: createDepositFulfillmentMutation('POST'),
  updateDepositFulfillment: createDepositFulfillmentMutation('PUT'),
};
