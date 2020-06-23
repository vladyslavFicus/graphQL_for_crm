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

const getPaymentsStatistic = async function(_, { dateFrom, dateTo, ...args }, { headers: { authorization } }) {
  const { data, error } = await getPaymentsStatisticsQuery(
    {
      ...args,
      dateFrom: moment(dateFrom)
        .utc()
        .format(),
      dateTo: dateTo
        ? moment(dateTo)
            .utc()
            .format()
        : null,
    },
    authorization
  );

  if (error) {
    return { error };
  }

  const { payments, totalAmount, totalCount, additionalStatistics } = data;
  let result = { items: [] };

  if (Array.isArray(payments) && payments.length) {
    const dateArray = getStatisticInitialArray(dateFrom, dateTo);

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

  if (Array.isArray(additionalStatistics) && additionalStatistics.length) {
    additionalStatisticData = additionalStatistics.reduce(
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
