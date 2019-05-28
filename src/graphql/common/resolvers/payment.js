const fetch = require('../../../utils/fetch');
const parseJson = require('../../../utils/parseJson');
const { PAYMENT_TYPES } = require('../../../constants/payment');
const {
  queries: {
    getPaymentMethods: getPaymentMethodsQuery,
    getTradingPayments: getTradingPaymentsQuery,
    createTradingPayment,
  },
} = require('../../../utils/payment');
const { mapActionToStatus } = require('../../../constants/payment');

const getClientPayments = async (_, args, { headers: { authorization }, hierarchy }) => {
  const profileIds = await hierarchy.getCustomersIds();
  const _args = { ...args, profileIds, withOriginalAgent: true };

  const tradingPayments = await getTradingPaymentsQuery(_args, authorization);

  return tradingPayments;
};

const getClientPaymentsByUuid = async (_, { playerUUID, ...args }, { headers: { authorization } }) => {
  const tradingPayments = await getTradingPaymentsQuery({ profileIds: [playerUUID], ...args }, authorization);

  return tradingPayments;
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

const getOperatorPaymentMethods = function(_, __, { headers: { authorization } }) {
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
  { playerProfile, paymentType, login, externalReference, country, language, source, target, expirationDate, ...args },
  { headers: { authorization } }
) => {
  let tradingArgs = {};

  switch (paymentType.toUpperCase()) {
    case PAYMENT_TYPES.DEPOSIT:
      tradingArgs = {
        playerProfile,
        login,
        externalReference,
        language,
        ...args,
      };
      break;

    case PAYMENT_TYPES.WITHDRAW:
      tradingArgs = {
        playerProfile,
        language,
        login,
        ...args,
      };
      break;

    case PAYMENT_TYPES.CONFISCATE:
      break;

    case PAYMENT_TYPES.TRANSFER:
      tradingArgs = {
        language,
        playerProfile,
        source,
        target,
        ...args,
      };
      break;
    case PAYMENT_TYPES.CREDIT_IN:
    case PAYMENT_TYPES.CREDIT_OUT:
      tradingArgs = {
        playerProfile,
        language,
        login,
        expirationDate,
        ...args,
      };
      break;

    default:
      break;
  }

  const tradingPayment = await createTradingPayment(paymentType, tradingArgs, authorization);

  if (tradingPayment.error) {
    return tradingPayment;
  }

  return {
    data: { ...tradingPayment.data, generationDate: tradingPayment.data.creationTime },
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
  }).then(response =>
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

const getPaymentMethods = async (_, args, { headers: { authorization } }) => {
  const methods = await getPaymentMethodsQuery(args, authorization);

  return Array.isArray(methods) ? methods : [];
};

const getRates = function(_, { brandId }) {
  return fetch(`${global.appConfig.apiUrl}/payment/public/rates?brandId=${brandId}`, { method: 'GET' })
    .then(response => response.text())
    .then(response => parseJson(response));
};

const acceptPayment = async function(_, { typeAcc, ...args }, context) {
  const {
    headers: { authorization },
  } = context;
  const response = await fetch(`${global.appConfig.apiUrl}/trading_payment/${typeAcc}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  return { data: { success: response.status === 200 } };
};

const changePaymentMethod = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/trading_payment/${args.paymentId}/method`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentMethod: args.paymentMethod }),
  }).then(response => ({ data: { success: response.status === 200 } }));
};

const changePaymentStatus = function(_, args, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/trading_payment/${args.paymentId}/status`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentStatus: args.paymentStatus }),
  }).then(response => ({ data: { success: response.status === 200 } }));
};

module.exports = {
  getPaymentMethods,
  getRates,
  getOperatorPaymentMethods,
  createClientPayment,
  getClientPayments,
  getClientPaymentsByUuid,
  getPaymentStatuses,
  changeStatus,
  acceptPayment,
  changePaymentMethod,
  changePaymentStatus,
};
