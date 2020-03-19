const fetch = require('../../../utils/fetch');
const { PAYMENT_TYPES } = require('../../../constants/payment');
const {
  getPaymentsQuery,
  createPaymentQuery,
  getPaymentMethodsQuery,
  getManualPaymentMethodsQuery,
} = require('../../../utils/payment');

const getClientPayments = async (_, args, { headers: { authorization }, hierarchy }) => {
  const profileIds = await hierarchy.getCustomersIds();
  const _args = { ...args, profileIds, withOriginalAgent: true };

  const payments = await getPaymentsQuery(_args, authorization);

  return payments;
};

const getClientPaymentsByUuid = async (_, { playerUUID, accountType, ...args }, { headers: { authorization } }) => {
  const payments = await getPaymentsQuery(
    {
      profileIds: [playerUUID],
      ...(accountType && { accountType }),
      ...args,
    },
    authorization
  );

  return payments;
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

  const payment = await createPaymentQuery(paymentType, tradingArgs, authorization);

  if (payment.error) {
    return payment;
  }

  return {
    data: { ...payment.data, generationDate: payment.data.creationTime },
  };
};

const acceptPayment = async function(_, { typeAcc, ...args }, context) {
  const {
    headers: { authorization },
  } = context;
  const response = await fetch(`${global.appConfig.apiUrl}/payment/${typeAcc}`, {
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
  return fetch(`${global.appConfig.apiUrl}/payment/${args.paymentId}/method`, {
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
  return fetch(`${global.appConfig.apiUrl}/payment/${args.paymentId}/status`, {
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
  return fetch(`${global.appConfig.apiUrl}/payment/${paymentId}/agent`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => ({ success: response.status === 200 }));
};

const getPaymentMethods = async (_, __, { headers: { authorization } }) => {
  const response = await getPaymentMethodsQuery(authorization);

  if (response.error) {
    return response;
  }

  return [...response.data].filter(method => method && method !== 'null').sort();
};

const getManualPaymentMethods = async (_, __, { headers: { authorization } }) => {
  const response = await getManualPaymentMethodsQuery(authorization);

  if (response.error) {
    return response;
  }

  return [...response.data].sort();
};

module.exports = {
  getPaymentMethods,
  getManualPaymentMethods,
  createClientPayment,
  getClientPayments,
  getClientPaymentsByUuid,
  acceptPayment,
  changePaymentMethod,
  changePaymentStatus,
  changeOriginalAgent,
};
