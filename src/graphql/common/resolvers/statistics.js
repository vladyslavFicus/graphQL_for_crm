const { get } = require('lodash');
const moment = require('moment');
const { getScrollData, getCountData, queryBuild } = require('../../../utils/ESSearchHelpers');
const { getDailyPayments } = require('./reconciliation');
const accessValidate = require('../../../utils/accessValidate');
const { convertToUtcDates } = require('../../../utils/utcHelpers');
const { compareDateFormat, getStatisticInitialArray, getCountQueryRanges } = require('../../../utils/statisticHelpers');

const registerStatQuery = ({ registrationDateFrom, registrationDateTo, clientIds }) => [
  queryBuild.ids(clientIds),
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
    registerStatQuery(context.hierarchy.buildQueryArgs(argsInUtc, { clientIds: context.hierarchy.getCustomerIds() })),
    '1s',
    'profile',
    ['registrationDate']
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

const getRegisteredUserTotals = async (_, { timezone }, context) => {
  const access = await accessValidate(context);

  if (access.error) {
    return { error: access.error };
  }

  const queries = getCountQueryRanges(timezone);
  const keys = Object.keys(queries);
  const ids = !context.hierarchy.isAdministration && queryBuild.ids(context.hierarchy.getCustomerIds());

  const result = await Promise.all(
    Object.values(queries).map(value => getCountData(context.brand.id, [...value, ...(ids ? [ids] : [])], 'profile'))
  ).then(data =>
    data.reduce(
      (acc, { count, error }, index) => ({
        ...acc,
        [keys[index]]: {
          count,
          error,
        },
      }),
      {}
    )
  );

  return result;
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
  getRegisteredUserTotals,
  getPaymentsStatistic,
};
