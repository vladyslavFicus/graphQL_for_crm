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
    AWAITING: { value: 'AWAITING' },
    REVIEW: { value: 'REVIEW' },
    PARTIAL_KYC: { value: 'PARTIAL_KYC' },
    PARTIAL_KYC_CAN_TRADE: { value: 'PARTIAL_KYC_CAN_TRADE' },
    APPROVED: { value: 'APPROVED' },
    REJECTED: { value: 'REJECTED' },
    FLAGGED_NON_COMPLIANT: { value: 'FLAGGED_NON_COMPLIANT' },
    REFUNDED_NON_COMPLIANT: { value: 'REFUNDED_NON_COMPLIANT' },
    PRIOR_TO_REFUND: { value: 'PRIOR_TO_REFUND' },
  },
});

const ClientTypeEnum = new GraphQLEnumType({
  name: 'tradingProfileClientType',
  values: {
    NONE: { value: 'NONE' },
    INDIVIDUAL_RETAIL: { value: 'INDIVIDUAL_RETAIL' },
    INDIVIDUAL_PPROFESSIONAL: { value: 'INDIVIDUAL_PPROFESSIONAL' },
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
    CONVERTED_CALLBACK: { value: 'CONVERTED_CALLBACK' },
    INTERESTED: { value: 'INTERESTED' },
    NOT_INTERESTED: { value: 'NOT_INTERESTED' },
    WRONG_INFO: { value: 'WRONG_INFO' },
    INIT_CALL_DO: { value: 'INIT_CALL_DO' },
    NOT_CALL: { value: 'NOT_CALL' },
    NO_FUNDS: { value: 'NO_FUNDS' },
    FAILED_DEPOSIT: { value: 'FAILED_DEPOSIT' },
    CLOSED: { value: 'CLOSED' },
    INVALID_LANGUAGE: { value: 'INVALID_LANGUAGE' },
    REASSIGN: { value: 'REASSIGN' },
    UNDER_18: { value: 'UNDER_18' },
    WRONG_NUMBER: { value: 'WRONG_NUMBER' },
    DUPLICATE: { value: 'DUPLICATE' },
    VOICEMAIL: { value: 'VOICEMAIL' },
    NEVER_ANSWER: { value: 'NEVER_ANSWER' },
  },
});

const RetentionStatusesEnum = new GraphQLEnumType({
  name: 'tradingProfileRetentionStatus',
  values: {
    NEW: { value: 'NEW' },
    CALLBACK: { value: 'CALLBACK' },
    WRONG_NUMBER: { value: 'WRONG_NUMBER' },
    NEVER_ANSWER: { value: 'NEVER_ANSWER' },
    ANSWER_REASSIGN: { value: 'ANSWER_REASSIGN' },
    HAS_POTENTIAL_REASSIGN: { value: 'HAS_POTENTIAL_REASSIGN' },
    NO_POTENTIAL: { value: 'NO_POTENTIAL' },
    NOT_INTERESTED: { value: 'NOT_INTERESTED' },
    UNDER_18: { value: 'UNDER_18' },
    INVALID_LANGUAGE: { value: 'INVALID_LANGUAGE' },
    SEASSIONS_ONLY: { value: 'SEASSIONS_ONLY' },
    RECOVERY_DEPOSITOR: { value: 'RECOVERY_DEPOSITOR' },
    RECEIVED_WITHDRAWAL: { value: 'RECEIVED_WITHDRAWAL' },
  },
});

module.exports = {
  AquisitionStatusesEnum,
  ClientTypeEnum,
  KYCStatusesEnum,
  SalesStatusesEnum,
  RetentionStatusesEnum,
};
