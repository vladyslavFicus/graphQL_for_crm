const fetch = require('./fetch');
const parseJson = require('./parseJson');

const paymentTypes = ['deposit', 'withdraw'];

const paymentTypeUrlMatcher = {
  deposit: 'deposit/manual',
  withdraw: 'withdraw',
  confiscate: 'confiscate',
  transfer: ['withdraw', 'deposit/manual'],
};

const accumulator = {
  depositCount: 0,
  depositAmount: {
    amount: 0,
    currency: 'EUR',
  },
  withdrawCount: 0,
  withdrawAmount: {
    amount: 0,
    currency: 'EUR',
  },
  currency: 'EUR',
};

const getStatistic = content =>
  content && content.length > 0
    ? content
        .map(item => ({ ...item, paymentType: item.paymentType.toLowerCase() }))
        .filter(item => paymentTypes.indexOf(item.paymentType) !== -1)
        .reduce(
          (acc, curr) => ({
            ...acc,
            [`${curr.paymentType}Count`]: acc[`${curr.paymentType}Count`] + 1,
            [`${curr.paymentType}Amount`]: {
              amount: acc[`${curr.paymentType}Amount`].amount + curr.amount.amount,
              currency: curr.amount.currency,
            },
          }),
          { ...accumulator }
        )
    : {
        ...accumulator,
      };

const normalizeAccumulated = (obj, currency) => ({
  amount: Object.values(obj)[0] || 0,
  currency: Object.keys(obj)[0] || currency,
});

const getUrlFromPaymentType = paymentType => paymentTypeUrlMatcher[paymentType.toLowerCase()];

const tradingPaymentsQuery = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/trading_payment/search`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization,
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};

const mapPaymentsWithTradingFields = async (casinoPayments, authorization) => {
  const paymentIds = casinoPayments.content.map(item => item.paymentId);
  const tradingPayments = await tradingPaymentsQuery({ paymentIds }, authorization);

  if (tradingPayments.error || tradingPayments.jwtError) {
    return [];
  }

  const content = casinoPayments.content.map(item => {
    const { login: tradingAcc, symbol, accountType, externalReference } =
      tradingPayments.find(trade => trade.paymentId === item.paymentId) || {};

    return {
      ...item,
      tradingAcc,
      symbol,
      accountType,
      externalReference,
    };
  });

  return content;
};

module.exports = {
  getStatistic,
  normalizeAccumulated,
  getUrlFromPaymentType,
  mapPaymentsWithTradingFields,
};
