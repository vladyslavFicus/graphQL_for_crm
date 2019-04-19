const { GraphQLEnumType } = require('graphql');

const AquisitionStatusesEnum = new GraphQLEnumType({
  name: 'tradingProfileAquisitionStatus',
  values: {
    SALES: { value: 'SALES' },
    RETENTION: { value: 'RETENTION' },
  },
});

const KYCStatusesEnum = new GraphQLEnumType({
  name: 'tradingProfileKYCStatus',
  values: {
    NO_KYC: { value: 'NO_KYC' },
    AWAITING_REVIEW: { value: 'AWAITING_REVIEW' },
    PARTIAL: { value: 'PARTIAL' },
    APPROVED: { value: 'APPROVED' },
    REJECTED: { value: 'REJECTED' },
    PENDING: { value: 'PENDING' },
    RISK: { value: 'RISK' },
  },
});

const ClientTypeEnum = new GraphQLEnumType({
  name: 'tradingProfileClientType',
  values: {
    NONE: { value: 'NONE' },
    INDIVIDUAL_RETAIL: { value: 'INDIVIDUAL_RETAIL' },
    INDIVIDUAL_PROFESSIONAL: { value: 'INDIVIDUAL_PROFESSIONAL' },
    CORPORATE_RETAIL: { value: 'CORPORATE_RETAIL' },
    CORPORATE_PROFESSIONAL: { value: 'CORPORATE_PROFESSIONAL' },
  },
});

const SalesStatusesEnum = new GraphQLEnumType({
  name: 'tradingProfileSalesStatus',
  values: {
    NEW: { value: 'NEW' },
    NO_ANSWER: { value: 'NO_ANSWER' },
    NO_ANSWER_2: { value: 'NO_ANSWER_2' },
    NO_ANSWER_3: { value: 'NO_ANSWER_3' },
    NO_ANSWER_4: { value: 'NO_ANSWER_4' },
    NO_ANSWER_5: { value: 'NO_ANSWER_5' },
    WRONG_INFO: { value: 'WRONG_INFO' },
    FAILED_DEPOSIT: { value: 'FAILED_DEPOSIT' },
    INVALID_LANGUAGE: { value: 'INVALID_LANGUAGE' },
    REASSIGN: { value: 'REASSIGN' },
    UNDER_18: { value: 'UNDER_18' },
    WRONG_NUMBER: { value: 'WRONG_NUMBER' },
    DUPLICATE: { value: 'DUPLICATE' },
    VOICEMAIL: { value: 'VOICEMAIL' },
    NEVER_ANSWER: { value: 'NEVER_ANSWER' },
    CONVERTED: { value: 'CONVERTED' },
    CALLBACK: { value: 'CALLBACK' },
    POTENTIAL_HIGH: { value: 'POTENTIAL_HIGH' },
    POTENTIAL_LOW: { value: 'POTENTIAL_LOW' },
    NO_INTEREST: { value: 'NO_INTEREST' },
    INITIAL_CALL: { value: 'INITIAL_CALL' },
    NO_MONEY: { value: 'NO_MONEY' },
    TEST: { value: 'TEST' },
    DEPOSITOR: { value: 'DEPOSITOR' },
    INVALID_COUNTRY: { value: 'INVALID_COUNTRY' },
  },
});

const RetentionStatusesEnum = new GraphQLEnumType({
  name: 'tradingProfileRetentionStatus',
  values: {
    NEW: { value: 'NEW' },
    CALLBACK: { value: 'CALLBACK' },
    NEVER_ANSWER: { value: 'NEVER_ANSWER' },
    NO_POTENTIAL: { value: 'NO_POTENTIAL' },
    RECOVERY_DEPOSITOR: { value: 'RECOVERY_DEPOSITOR' },
    RECEIVED_WITHDRAWAL: { value: 'RECEIVED_WITHDRAWAL' },
    ACTIVE: { value: 'ACTIVE' },
    DEPOSIT_WITH_ME: { value: 'DEPOSIT_WITH_ME' },
    NO_ANSWER: { value: 'NO_ANSWER' },
    DEPOSITOR: { value: 'DEPOSITOR' },
    ACTIVE_VIP: { value: 'ACTIVE_VIP' },
    PAMM: { value: 'PAMM' },
    NEED_DOCS: { value: 'NEED_DOCS' },
    NO_TRADES: { value: 'NO_TRADES' },
    REASSIGN: { value: 'REASSIGN' },
  },
});

module.exports = {
  AquisitionStatusesEnum,
  ClientTypeEnum,
  KYCStatusesEnum,
  SalesStatusesEnum,
  RetentionStatusesEnum,
};
