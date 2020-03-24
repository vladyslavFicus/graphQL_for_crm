const moment = require('moment');
const { getPaymentsStatisticsQuery } = require('../../../utils/payment');
const { getRegisteredUsersStatistic: getRegisteredUsersStatisticRequest } = require('../../../utils/statisticRequests');
const {
  prepareAdditionalStatsUsersRegistration,
  prepareRegistrationsData,
} = require('../../../utils/statisticHelpers');
const { getPaymentStatisticTotals, getStatisticInitialArray } = require('../../../utils/statisticHelpers');

const getRegisteredUsersChartData = async (_, args, { headers: { authorization } }) => {
  const {
    data: { additionalStatistics, registrations },
  } = await getRegisteredUsersStatisticRequest(args, authorization);

  return {
    data: {
      additionalStatistics: prepareAdditionalStatsUsersRegistration(additionalStatistics),
      registrations: prepareRegistrationsData(registrations),
    },
  };
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
        entryDate: moment(date).format('DD.MM'),
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
  getRegisteredUsersChartData,
  getPaymentsStatistic,
};
