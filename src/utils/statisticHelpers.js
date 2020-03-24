const moment = require('moment');
const { queryBuild } = require('./ESSearchHelpers');

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

const prepareAdditionalStatsUsersRegistration = stats => {
  return stats.reduce(
    (acc, { count }, idx) => {
      switch (idx) {
        case 0:
          acc.total.value = count;
          break;
        case 1:
          acc.month.value = count;
          break;
        case 2:
          acc.today.value = count;
          break;
        default:
          return null;
      }

      return acc;
    },
    {
      total: { value: null },
      month: { value: null },
      today: { value: null },
    }
  );
};

const prepareRegistrationsData = registrations => {
  return registrations.map(({ count, date }) => ({
    entryDate: moment(date).format('DD.MM'),
    entries: count,
  }));
};

const getPaymentStatisticTotals = (index, { paymentsCount, totalAmount }) => {
  let propName = '';

  switch (index) {
    case 0: {
      propName = 'today';
      break;
    }
    case 1: {
      propName = 'month';
      break;
    }
    case 2: {
      propName = 'total';
      break;
    }
  }

  return {
    [`${propName}Amount`]: totalAmount,
    [`${propName}Count`]: paymentsCount,
  };
};

module.exports = {
  compareDateFormat,
  prepareRegistrationsData,
  getStatisticInitialArray,
  getPaymentStatisticTotals,
  prepareAdditionalStatsUsersRegistration,
};
