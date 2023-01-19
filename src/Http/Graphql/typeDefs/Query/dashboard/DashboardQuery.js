const { gql } = require('apollo-server-express');

module.exports = gql`
  type DashboardQuery {
    lastNotifications: [LastNotification!]
    lastWithdrawals: [LastDepositWithdrawal!]
    lastDeposits: [LastDepositWithdrawal!]

    registrationStatistic(
      dateFrom: String
      dateTo: String
      zoneId: String
      summary: [ChartDataSummary__Input]
    ): ChartData

    depositAmountStatistic(
      dateFrom: String
      dateTo: String
      zoneId: String
      summary: [ChartDataSummary__Input]
    ): ChartData

    depositCountStatistic(
      dateFrom: String
      dateTo: String
      zoneId: String
      summary: [ChartDataSummary__Input]
    ): ChartData

    withdrawalAmountStatistic(
      dateFrom: String
      dateTo: String
      zoneId: String
      summary: [ChartDataSummary__Input]
    ): ChartData

    withdrawalCountStatistic(
      dateFrom: String
      dateTo: String
      zoneId: String
      summary: [ChartDataSummary__Input]
    ): ChartData

    retentionAmountStatistic(
      dateFrom: String
      dateTo: String
      zoneId: String
      summary: [ChartDataSummary__Input]
    ): ChartData

    retentionCountStatistic(
      dateFrom: String
      dateTo: String
      zoneId: String
      summary: [ChartDataSummary__Input]
    ): ChartData

    ftrAmountStatistic(
      dateFrom: String
      dateTo: String
      zoneId: String
      summary: [ChartDataSummary__Input]
    ): ChartData

    ftrCountStatistic(
      dateFrom: String
      dateTo: String
      zoneId: String
      summary: [ChartDataSummary__Input]
    ): ChartData

    ftdAmountStatistic(
      dateFrom: String
      dateTo: String
      zoneId: String
      summary: [ChartDataSummary__Input]
    ): ChartData

    ftdCountStatistic(
      dateFrom: String
      dateTo: String
      zoneId: String
      summary: [ChartDataSummary__Input]
    ): ChartData
  }
`;
