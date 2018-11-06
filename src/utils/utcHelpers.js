const moment = require('moment');

const convertToUtcDates = args =>
  Object.entries(args).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: moment.utc(value).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
    }),
    {}
  );

module.exports = {
  convertToUtcDates,
};
