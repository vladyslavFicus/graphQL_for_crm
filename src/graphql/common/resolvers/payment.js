const fetch = require('../../../utils/fetch');
const { PAYMENT_TYPES } = require('../../../constants/payment');
const {
  queries: {
    getPaymentMethods: getPaymentMethodsQuery,
    getTradingPayments: getTradingPaymentsQuery,
    createTradingPayment,
  },
} = require('../../../utils/payment');

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

const createClientPayment = async (
  _,
  { paymentType, login, externalReference, country, source, target, expirationDate, profileUUID, ...args },
  { headers: { authorization } }
) => {
  let tradingArgs = {};

  switch (paymentType.toUpperCase()) {
    case PAYMENT_TYPES.DEPOSIT:
      tradingArgs = {
        login,
        externalReference,
        profileUUID,
        ...args,
      };
      break;

    case PAYMENT_TYPES.WITHDRAW:
      tradingArgs = {
        login,
        profileUUID,
        ...args,
      };
      break;

    case PAYMENT_TYPES.CONFISCATE:
      break;

    case PAYMENT_TYPES.TRANSFER:
      tradingArgs = {
        source,
        target,
        profileUUID,
        ...args,
      };
      break;
    case PAYMENT_TYPES.CREDIT_IN:
    case PAYMENT_TYPES.CREDIT_OUT:
      tradingArgs = {
        login,
        profileUUID,
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

const getPaymentMethods = async (_, args, { headers: { authorization } }) => {
  const methods = await getPaymentMethodsQuery(args, authorization);

  return Array.isArray(methods) ? methods : [];
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

const changeOriginalAgent = function(_, { paymentId, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/trading_payment/${paymentId}/agent`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

module.exports = {
  getPaymentMethods,
  createClientPayment,
  getClientPayments,
  getClientPaymentsByUuid,
  acceptPayment,
  changePaymentMethod,
  changePaymentStatus,
  changeOriginalAgent,
};
