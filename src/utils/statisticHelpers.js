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

const getCountQueryRanges = timezone => ({
  today: [
    queryBuild.range('registrationDate', {
      gte: moment()
        .startOf('day')
        .utcOffset(timezone)
        .utc()
        .format(),
      lte: moment.utc().format(),
    }),
  ],
  month: [
    queryBuild.range('registrationDate', {
      gte: moment()
        .startOf('month')
        .utcOffset(timezone)
        .utc()
        .format(),
      lte: moment.utc().format(),
    }),
  ],
  total: [queryBuild.range('registrationDate', { lte: moment.utc().format() })],
});

module.exports = {
  compareDateFormat,
  getStatisticInitialArray,
  getCountQueryRanges,
};
