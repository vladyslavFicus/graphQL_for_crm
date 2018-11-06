const { get } = require('lodash');
const moment = require('moment');
const { getScrollData, queryBuild } = require('../../../utils/ESSearchHelpers');
const { getDailyPayments } = require('./reconciliation');
const accessValidate = require('../../../utils/accessValidate');
const { convertToUtcDates } = require('../../../utils/utcHelpers');

const compareDateFormat = 'YYYY-MM-DD';

const getStatisticInitialArray = (from, to, timezone) => {
  const diffDays = moment(to).diff(moment(from), 'days');
  const diffMonth = moment(to).diff(moment(from), 'month');

  let resultArray = [];

  if (diffMonth === 0) {
    let date = moment(from).utcOffset(timezone);

    if (diffDays === 0) {
      resultArray.push(date.format(compareDateFormat));
    } else {
      for (let i = 0; i < diffDays; i++) {
        resultArray.push(date.format(compareDateFormat));
        date.add(1, 'days');
      }
    }
  } else {
    const fromDateDayNumber = Number(
      moment(from)
        .utcOffset(timezone)
        .format('D')
    );
    const toDateDayNumber = Number(
      moment(to)
        .utcOffset(timezone)
        .format('D')
    );
    const endOfPrevMonthDayNumber = Number(
      moment(from)
        .utcOffset(timezone)
        .endOf('month')
        .format('D')
    );

    for (let i = fromDateDayNumber; i <= endOfPrevMonthDayNumber; i++) {
      const entryDate =
        i === fromDateDayNumber
          ? moment(from)
              .utcOffset(timezone)
              .format(compareDateFormat)
          : moment(from)
              .utcOffset(timezone)
              .add(i - fromDateDayNumber, 'days')
              .format(compareDateFormat);

      resultArray.push(entryDate);
    }

    for (let i = 1; i < toDateDayNumber; i++) {
      const entryDate = moment(to)
        .utcOffset(timezone)
        .subtract(toDateDayNumber - i, 'days')
        .format(compareDateFormat);

      resultArray.push(entryDate);
    }
  }

  return resultArray;
};

const registerStatQuery = ({ registrationDateFrom, registrationDateTo }) => [
  queryBuild.range('registrationDate', { gte: registrationDateFrom, lte: registrationDateTo }),
];

const getRegisteredUserStatistic = async function(_, args, context) {
  const access = await accessValidate(context);

  if (access.error) {
    return { error: access.error };
  }

  const argsInUtc = convertToUtcDates(args);
  const response = await getScrollData(
    context.brand.id,
    registerStatQuery(argsInUtc),
    ['registrationDate'],
    '1s',
    'profile'
  );
  const error = get(response, 'error');

  if (error) {
    return { error };
  }

  const { registrationDateFrom, registrationDateTo } = args;
  const timezone = registrationDateFrom.substr(-6);

  const statistic = response.hits.reduce(
    (acc, curr) => ({
      ...acc,
      [moment(curr)
        .utcOffset(timezone)
        .format(compareDateFormat)]: acc[
        moment(curr)
          .utcOffset(timezone)
          .format(compareDateFormat)
      ]
        ? acc[
            moment(curr)
              .utcOffset(timezone)
              .format(compareDateFormat)
          ] + 1
        : 1,
    }),
    {}
  );

  const dateArray = getStatisticInitialArray(registrationDateFrom, registrationDateTo, timezone);
  const items = dateArray.map(date => ({
    entries: statistic[date] || 0,
    entryDate: date,
  }));

  return {
    data: {
      total: response.total,
      items,
    },
  };
};

const getPaymentsStatistic = async function(_, { dateFrom, dateTo }, context) {
  const access = await accessValidate(context);

  if (access.error) {
    return { error: access.error };
  }

  const {
    headers: { authorization },
    brand: { id: brandId, currency },
  } = context;
  const timezone = dateFrom.substr(-6);

  const dailyPayments = await getDailyPayments(
    _,
    {
      dateFrom: moment(dateFrom).format(compareDateFormat),
      dateTo: moment(dateTo).format(compareDateFormat),
      currency,
      brandId,
    },
    { headers: { authorization } }
  );
  const error = get(dailyPayments, 'error');

  if (error) {
    return { error };
  }

  const initialObj = {
    data: {
      items: [],
      totalDepositsAmount: 0,
      totalDepositsCount: 0,
      totalWithdrawsAmount: 0,
      totalWithdrawsCount: 0,
    },
  };

  if (Array.isArray(dailyPayments) && dailyPayments.length !== 0) {
    const dateArray = getStatisticInitialArray(dateFrom, dateTo, timezone);

    const items = dateArray.map(date => {
      const data = dailyPayments.find(data => moment(date).diff(moment(data.date).format(compareDateFormat)) === 0);

      return {
        deposits: {
          amount: data ? Number(data.deposits).toFixed(2) : 0,
          count: data ? data.depositsCount : 0,
          entryDate: date,
        },
        withdraws: {
          amount: data ? Number(data.withdraws).toFixed(2) : 0,
          count: data ? data.withdrawsCount : 0,
          entryDate: date,
        },
      };
    });

    const result = dailyPayments.reduce(
      (acc, curr) => ({
        data: {
          ...acc.data,
          totalDepositsAmount: Math.round((acc.data.totalDepositsAmount + curr.deposits) * 100) / 100,
          totalDepositsCount: acc.data.totalDepositsCount + curr.depositsCount,
          totalWithdrawsAmount: acc.data.totalWithdrawsAmount + curr.withdraws,
          totalWithdrawsCount: acc.data.totalWithdrawsCount + curr.withdrawsCount,
        },
      }),
      { data: { ...initialObj.data, items } }
    );

    return result;
  }

  return initialObj;
};

module.exports = {
  getRegisteredUserStatistic,
  getPaymentsStatistic,
};
