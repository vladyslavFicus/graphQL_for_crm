const moment = require('moment');

const compareDateFormat = 'YYYY-MM-DD';

const getStatisticInitialArray = (from, to) => {
  const diffDays = moment(to).diff(moment(from), 'days');
  const diffMonth = moment(to).diff(moment(from), 'month');

  let resultArray = [];

  if (diffMonth === 0) {
    let date = moment.parseZone(from);

    if (diffDays === 0) {
      resultArray.push(date.format(compareDateFormat));
    } else {
      for (let i = 0; i < diffDays; i++) {
        resultArray.push(date.format(compareDateFormat));
        date.add(1, 'days');
      }
    }
  } else {
    const endOfPrevMonthDayNumber = Number(
      moment(from)
        .endOf('month')
        .format('D')
    );
    const fromDateDayNumber = Number(moment(from).format('D'));
    const toDateDayNumber = Number(moment(to).format('D'));

    for (let i = fromDateDayNumber; i <= endOfPrevMonthDayNumber; i++) {
      const entryDate =
        i === fromDateDayNumber
          ? moment(from).format(compareDateFormat)
          : moment(from)
              .add(i - fromDateDayNumber, 'days')
              .format(compareDateFormat);

      resultArray.push(entryDate);
    }

    for (let i = 1; i < toDateDayNumber; i++) {
      const entryDate = moment(to)
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
      propName = 'total';
      break;
    }
    case 1: {
      propName = 'month';
      break;
    }
    case 2: {
      propName = 'today';
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
