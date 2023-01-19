const { gql } = require('apollo-server-express');

module.exports = gql`
  input ChartDataSummary__Input {
    type: ChartData__Summary__Enum!
    dateFrom: String
    dateTo: String
  }
`;
