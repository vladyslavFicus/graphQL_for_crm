const { get } = require('lodash');
const moment = require('moment');
const { getScrollData, getCountData, queryBuild } = require('../../../utils/ESSearchHelpers');
const { getPaymentsStatisticsQuery } = require('../../../utils/payment');
const { convertToUtcDates } = require('../../../utils/utcHelpers');
const {
  compareDateFormat,
  getStatisticInitialArray,
  getCountQueryRanges,
  getPaymentStatisticTotals,
} = require('../../../utils/statisticHelpers');

const registerStatQuery = ({ registrationDateFrom, registrationDateTo, clientIds }) => [
  queryBuild.ids(clientIds),
  queryBuild.range('registrationDate', { gte: registrationDateFrom, lte: registrationDateTo }),
];

const getRegisteredUserStatistic = async function(_, args, context) {
  const clientIds = await context.hierarchy.getCustomersIds();
  const argsInUtc = convertToUtcDates(args);
  const response = await getScrollData(
    context.brand.id,
    registerStatQuery({ ...argsInUtc, clientIds }),
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
  const clientIds = await context.hierarchy.getCustomersIds();
  const queries = getCountQueryRanges(timezone);
  const keys = Object.keys(queries);
  const ids = queryBuild.ids(clientIds);

  const result = await Promise.all(
    Object.values(queries).map(value => getCountData(context.brand.id, [...value, ...(ids ? [ids] : [])], 'profile'))
  ).then(data =>
    data.reduce(
      (acc, { count, error }, index) => ({
        ...acc,
        [keys[index]]: {
          value: count,
          error,
        },
      }),
      {}
    )
  );

  return result;
};

const getPaymentsStatistic = async function(
  _,
  { additionalStatistics, dateFrom, dateTo, playerUUID, ...args },
  { hierarchy, headers: { authorization } }
) {
  const { data, error } = await getPaymentsStatisticsQuery(
    {
      ...args,
      ...(dateFrom && {
        dateFrom: moment(dateFrom)
          .utc()
          .format(),
      }),
      ...(dateTo && {
        dateTo: moment(dateTo)
          .utc()
          .format(),
      }),
      // HACK to get one player statistic
      profileIds: playerUUID ? [playerUUID] : await hierarchy.getCustomersIds(),
      ...(additionalStatistics && {
        additionalStatistics: additionalStatistics.map(obj =>
          Object.entries(obj).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: moment(value)
                .utc()
                .format(),
            }),
            {}
          )
        ),
      }),
    },
    authorization
  );

  if (error) {
    return { error };
  }

  const { payments, totalAmount, totalCount, additionalStatistics: extraStat } = data;
  let result = { items: [] };

  if (Array.isArray(payments) && payments.length) {
    const timezone = dateFrom.substr(-6);
    const dateArray = getStatisticInitialArray(dateFrom, dateTo, timezone);

    const items = dateArray.map(date => {
      const entity = payments.find(({ date: paymentDate }) => moment(date).diff(moment(paymentDate), 'days') === 0);

      return {
        amount: entity ? Number(entity.amount).toFixed(2) : 0,
        count: entity ? entity.count : 0,
        entryDate: date,
      };
    });

    result = {
      ...result,
      items,
      itemsTotal: {
        totalAmount,
        totalCount,
      },
    };
  }

  let additionalStatisticData = null;

  if (Array.isArray(extraStat) && extraStat.length) {
    additionalStatisticData = extraStat.reduce(
      (acc, entry, index) => ({
        ...acc,
        additionalTotal: {
          ...acc.additionalTotal,
          ...getPaymentStatisticTotals(index, entry),
        },
      }),
      { additionalTotal: {} }
    );
  }

  return {
    data: {
      ...result,
      ...(additionalStatisticData && additionalStatisticData),
    },
  };
};

module.exports = {
  getRegisteredUserStatistic,
  getRegisteredUserTotals,
  getPaymentsStatistic,
};
