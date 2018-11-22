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
  const _args = hierarchy.buildQueryArgs(args, { profileIds: hierarchy.getCustomerIds() });
  const tradingPayments = await getTradingPaymentsQuery(_args, authorization);

  if (tradingPayments.jwtError || tradingPayments.error) {
    return { error: tradingPayments.error };
  }

  return {
    data: tradingPayments,
  };
};

const getClientPaymentsByUuid = async (_, { playerUUID, args }, { headers: { authorization } }) => {
  const tradingPayments = await getTradingPaymentsQuery({ profileIds: [playerUUID], ...args }, authorization);

  if (tradingPayments.jwtError || tradingPayments.error) {
    return { error: tradingPayments.error };
  }

  return {
    data: tradingPayments,
  };
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
  { playerProfile, paymentType, login, externalReference, country, language, source, target, ...args },
  { headers: { authorization }, brand: { id: brandId } }
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
        profileId,
        brandId,
        country,
        language,
        login: target,
        expirationDate,
        ...args,
      };
      break;

    default:
      break;
  }

  const { error, jwtError } = await createTradingPayment(paymentType, tradingArgs, authorization);

  if (error || jwtError) {
    return {
      data: null,
      error: error || jwtError,
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

const getPaymentMethods = async (_, args, { headers: { authorization } }) => {
  const methods = await getPaymentMethodsQuery(args, authorization);

  return Array.isArray(methods) ? methods : [];
};

const getRates = function(_, { brandId }) {
  return fetch(`${global.appConfig.apiUrl}/payment/public/rates?brandId=${brandId}`, { method: 'GET' })
    .then(response => response.text())
    .then(response => parseJson(response));
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
  getPaymentStatuses,
  changeStatus,
};
