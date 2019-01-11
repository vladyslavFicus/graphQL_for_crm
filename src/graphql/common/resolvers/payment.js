const fetch = require('../../../utils/fetch');
const parseJson = require('../../../utils/parseJson');
const { PAYMENT_TYPES } = require('../../../constants/payment');
const {
  queries: {
    getPaymentMethods: getPaymentMethodsQuery,
    getTradingPayments: getTradingPaymentsQuery,
    getClientPaymentsStatistic: getClientPaymentsStatisticQuery,
    createTradingPayment,
    createCasinoPayment,
  },
  getStatistic,
  normalizeAccumulated,
} = require('../../../utils/payment');
const { getOperatorFromCache } = require('../../../utils/operatorUtils');
const { mapActionToStatus } = require('../../../constants/payment');

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

const getClientPayments = async (_, args, { headers: { authorization }, hierarchy }) => {
  const profileIds = await hierarchy.getCustomersIds();
  const _args = { ...args, profileIds };

  const tradingPayments = await getTradingPaymentsQuery(_args, authorization);

  return tradingPayments;
};

const getClientPaymentOriginalAgent = ({ agentId }, _, { headers: { authorization } }) => {
  return agentId ? getOperatorFromCache(agentId, authorization) : null;
};

const getClientPaymentsByUuid = async (_, { playerUUID, ...args }, { headers: { authorization } }) => {
  const tradingPayments = await getTradingPaymentsQuery({ profileIds: [playerUUID], ...args }, authorization);

  return tradingPayments;
};

// INFO: when trading_payment statistic endpoint ready - this will be rewritten
const getClientPaymentsStatistic = async (_, args, { headers: { authorization } }) => {
  const statistic = await getClientPaymentsStatisticQuery(args, authorization);

  return getStatistic(statistic.content);
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
  let casinoPayment = null;
  let tradingArgs = {};

  const typesWithoutCreatePayment = [
    PAYMENT_TYPES.TRANSFER,
    PAYMENT_TYPES.WITHDRAW,
    PAYMENT_TYPES.CREDIT_IN,
    PAYMENT_TYPES.CREDIT_OUT,
  ];

  if (!typesWithoutCreatePayment.includes(paymentType.toUpperCase())) {
    casinoPayment = await createCasinoPayment(
      {
        playerUUID: playerProfile.uuid,
        paymentType,
        ...args,
      },
      authorization
    );

    if (casinoPayment.error) {
      return {
        data: null,
        error: casinoPayment.error,
      };
    }
  }

  switch (paymentType.toUpperCase()) {
    case PAYMENT_TYPES.DEPOSIT:
      tradingArgs = {
        paymentId: casinoPayment.paymentId,
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
    data: casinoPayment || { ...tradingPayment.data, generationDate: tradingPayment.creationTime },
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

module.exports = {
  accumulated: paymentAccumulated,
  getPaymentMethods,
  getRates,
  getOperatorPaymentMethods,
  createClientPayment,
  getClientPayments,
  getClientPaymentsByUuid,
  getClientPaymentsStatistic,
  getClientPaymentOriginalAgent,
  getPaymentStatuses,
  changeStatus,
  acceptPayment,
};
