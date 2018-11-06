const jwtDecode = require('jwt-decode');
const fetch = require('../../../utils/fetch');
const parseJson = require('../../../utils/parseJson');
const buildQueryString = require('../../../utils/buildQueryString');
const {
  getStatistic,
  normalizeAccumulated,
  getUrlFromPaymentType,
  mapPaymentsWithTradingFields,
} = require('../../../utils/paymentUtils');
const { mapActionToStatus } = require('../../../constants/payment');
const { statuses } = require('../../../constants/limits');
const { getNotes } = require('./notes');
const mapNotesToEntities = require('../../../utils/mapNotesToEntities');

const paymentLocks = function(_, { playerUUID }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/payment/lock/${playerUUID}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(
      response =>
        Array.isArray(response)
          ? response.map(i => ({
              ...i,
              canUnlock: jwtDecode(authorization).user_uuid === i.authorUUID,
            }))
          : response
    );
};

const unlockPayment = function(_, { playerUUID, type, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/payment/lock/${playerUUID}/${type}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(
      response =>
        response.id
          ? {
              data: {
                ...response,
                canUnlock: jwtDecode(authorization).user_uuid === response.authorUUID,
              },
            }
          : { error: response }
    );
};

const lockPayment = function(_, { type, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/payment/lock/${type}`, {
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
    .then(
      response =>
        response.id
          ? {
              data: {
                ...response,
                canUnlock: jwtDecode(authorization).user_uuid === response.authorUUID,
              },
            }
          : { error: response }
    );
};

const paymentAccumulated = function(_, { playerUUID }, { headers: { authorization }, brand: { currency } }) {
  return fetch(`${global.appConfig.apiUrl}/payment/accumulated/${playerUUID}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => {
      const defaultValue = {
        amount: 0,
        currency,
      };

      return {
        baseCurrencyDeposits: response.baseCurrencyDeposits
          ? normalizeAccumulated(response.baseCurrencyDeposits, currency)
          : defaultValue,
        baseCurrencyWithdraws: response.baseCurrencyWithdraws
          ? normalizeAccumulated(response.baseCurrencyWithdraws, currency)
          : defaultValue,
        walletCurrencyDeposits: response.walletCurrencyDeposits
          ? normalizeAccumulated(response.walletCurrencyDeposits, currency)
          : defaultValue,
        walletCurrencyWithdraws: response.walletCurrencyWithdraws
          ? normalizeAccumulated(response.walletCurrencyWithdraws, currency)
          : defaultValue,
      };
    });
};

const getPaymentMethods = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/payment/methods?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      authorization,
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (Array.isArray(response) ? response : []));
};

const getRates = function(_, { brandId }) {
  return fetch(`${global.appConfig.apiUrl}/payment/public/rates?brandId=${brandId}`, { method: 'GET' })
    .then(response => response.text())
    .then(response => parseJson(response));
};

const getPayments = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/payment_view/payments?${buildQueryString(args, true)}`, {
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

const getClientPayments = async (_, args, { headers: { authorization } }) => {
  const casinoPayments = await getPayments(_, args, { headers: { authorization } });

  if (casinoPayments.jwtError || !casinoPayments.size) {
    return {
      size: 0,
      content: [],
    };
  }
  const content = await mapPaymentsWithTradingFields(casinoPayments, authorization);

  return {
    ...casinoPayments,
    content,
  };
};

const getCasinoPaymentsByUuid = (_, { playerUUID, ...args }, { headers: { authorization } }) => {
  return fetch(`${global.appConfig.apiUrl}/payment_view/payments/${playerUUID}?${buildQueryString(args)}`, {
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

const getClientPaymentsByUuid = async (_, args, { headers: { authorization } }) => {
  const casinoPayments = await getCasinoPaymentsByUuid(_, args, { headers: { authorization } });

  if (casinoPayments.jwtError || !casinoPayments.size) {
    return {
      size: 0,
      content: [],
    };
  }
  const content = await mapPaymentsWithTradingFields(casinoPayments, authorization);

  return {
    ...casinoPayments,
    content,
  };
};

const getClientPaymentsStatistic = function(_, { playerUUID, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/payment/payments/${playerUUID}?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => getStatistic(parseJson(response).content));
};

const createPaymentResolver = type => {
  return function(_, { playerUUID, ...args }, { headers: { authorization } }) {
    return fetch(`${global.appConfig.apiUrl}/payment/payments/${playerUUID}/${type}`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        authorization,
        'content-type': 'application/json',
      },
      body: JSON.stringify(args),
    })
      .then(response => response.text())
      .then(response => parseJson(response))
      .then(response => (response && response.paymentId ? { data: response } : { error: response }));
  };
};

const getPaymentStatuses = function(_, { paymentId, playerUUID }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/payment/payments/${playerUUID}/${paymentId}/statuses`, {
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

const createPayment = function(_, { playerUUID, paymentType, ...args }, { headers: { authorization } }) {
  const url = getUrlFromPaymentType(paymentType);
  return fetch(`${global.appConfig.apiUrl}/payment/payments/${playerUUID}/${url}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

const createTradingPayment = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_payment/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization,
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

const getOperatorPaymentMethods = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/payment/operator/methods`, {
    method: 'GET',
    headers: {
      authorization,
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (Array.isArray(response) ? { data: response } : { error: response }));
};

const createClientPayment = async (
  _,
  { playerUUID, paymentType, mt4Acc, paymentAccountUuid, externalReference, country, language, ...args },
  { headers: { authorization }, brand: { id: brandId } }
) => {
  const casinoPayment = await createPayment(
    _,
    {
      playerUUID,
      paymentType,
      ...(paymentAccountUuid ? { paymentAccountUuid, ...args } : { ...args }),
    },
    { headers: { authorization } }
  );

  if (casinoPayment.error) {
    return {
      data: null,
      error: casinoPayment.error,
    };
  }

  const tradingArgs = {
    profileId: playerUUID,
    paymentId: casinoPayment.paymentId,
    login: mt4Acc,
    accountType: paymentAccountUuid,
    paymentType: paymentType.toUpperCase(),
    paymentAccount: paymentAccountUuid,
    externalReference,
    country,
    language,
    brandId,
    ...args,
  };

  const tradingPayment = await createTradingPayment(tradingArgs, authorization);

  if (tradingPayment.error) {
    return {
      data: null,
      error: tradingPayment.error,
    };
  }

  return {
    data: casinoPayment,
    error: null,
  };
};

const changeStatus = function(_, { playerUUID, paymentId, action, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/payment/payments/${playerUUID}/${paymentId}/${action}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(
    response =>
      response.status === 200
        ? {
            data: {
              uuid: paymentId,
              status: mapActionToStatus[action],
            },
            error: null,
          }
        : {
            data: null,
            error: 'error.payment.changeStatus',
          }
  );
};

const getRegulationLimits = async function(_, { playerUUID }, context) {
  const {
    headers: { authorization },
  } = context;

  const regulationLimits = await fetch(`${global.appConfig.apiUrl}/payment/limits/${playerUUID}/regulation`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (response && response.length ? response : []));

  let data = [];

  if (!regulationLimits.error && regulationLimits.length) {
    const notes = await getNotes(_, { targetUUID: regulationLimits.map(i => i.uuid) }, context);

    if (notes && notes.data && notes.data.content) {
      data = mapNotesToEntities(regulationLimits, notes.data.content);
    }
  }

  return { data };
};

const cancelRegulationLimit = function(_, { playerUUID, uuid }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/payment/limits/${playerUUID}/deposit/${uuid}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(
    response =>
      response.status === 200 ? { data: { uuid, status: statuses.CANCELED } } : { error: 'error.cancel-limit' }
  );
};

const getPaymentReport = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/payment_view/payments/payment_report?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      authorization,
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (response && response.content ? { data: response } : { error: response }));
};

module.exports = {
  locks: paymentLocks,
  unlock: unlockPayment,
  lock: lockPayment,
  accumulated: paymentAccumulated,
  getPaymentMethods,
  getRates,
  createPaymentResolver,
  getPayments,
  getOperatorPaymentMethods,
  createClientPayment,
  getClientPayments,
  getClientPaymentsByUuid,
  getClientPaymentsStatistic,
  getPaymentStatuses,
  changeStatus,
  getRegulationLimits,
  cancelRegulationLimit,
  getPaymentReport,
};
