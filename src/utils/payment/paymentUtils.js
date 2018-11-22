const { getCasinoPayments } = require('./paymentRequests');
const paymentTypes = ['deposit', 'withdraw'];

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
    : { ...accumulator };

const normalizeAccumulated = (obj, currency) => ({
  amount: Object.values(obj)[0] || 0,
  currency: Object.keys(obj)[0] || currency,
});

module.exports = {
  getStatistic,
  normalizeAccumulated,
};
