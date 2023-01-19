const { gql } = require('apollo-server-express');

module.exports = gql`
  type ChartData {
    items: [ChartData__Item!]!
    summary: [ChartData__Summary!]!
  }

  type ChartData__Item {
    entryValue: Float!
    entryDate: String!
  }

  type ChartData__Summary {
    value: Float!
    type: ChartData__Summary__Enum!
  }

  enum ChartData__Summary__Enum {
    TODAY
    MONTH
    TOTAL
  }
`;
