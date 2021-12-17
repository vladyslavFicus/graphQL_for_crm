const { gql } = require('apollo-server-express');

module.exports = gql`
  enum TradingEngine__DaysOfWeek__Enum {
    SUNDAY
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
  }
`;
