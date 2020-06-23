const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } = require('graphql');
const { getDetails, geAuthorFullName } = require('../../common/resolvers/audit');

const FeedType = new GraphQLObjectType({
  name: 'Feed',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    authorFullName: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: geAuthorFullName,
    },
    authorUuid: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ authorUuid }) => (authorUuid === 'SYSTEM' ? '' : authorUuid),
    },
    brandId: { type: GraphQLString },
    creationDate: { type: new GraphQLNonNull(GraphQLString) },
    details: {
      type: GraphQLString,
      resolve: getDetails,
    },
    ip: { type: GraphQLString },
    targetFullName: { type: GraphQLString },
    targetUuid: { type: new GraphQLNonNull(GraphQLString) },
    uuid: { type: GraphQLString },
    type: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const FeedTypes = new GraphQLObjectType({
  name: 'FeedTypes',
  fields: () => ({
    PLAYER_PROFILE_CHANGED: { type: GraphQLString },
    RESET_PASSWORD: { type: GraphQLString },
    LOG_IN: { type: GraphQLString },
    CHANGE_PASSWORD: { type: GraphQLString },
    PLAYER_PROFILE_REGISTERED: { type: GraphQLString },
    LOG_OUT: { type: GraphQLString },
    FAILED_LOGIN_ATTEMPT: { type: GraphQLString },
    PROFILE_ASSIGN: { type: GraphQLString },
    CHANGE_LEVERAGE_REQUESTED: { type: GraphQLString },
    QUESTIONNAIRE_COMPLETED: { type: GraphQLString },
    OPERATOR_ACCOUNT_CREATED: { type: GraphQLString },
    TRADING_ACCOUNT_CREATED: { type: GraphQLString },
    CHANGE_LEVERAGE_REQUEST_CREATED: { type: GraphQLString },
    CHANGE_LEVERAGE_REQUEST_UPDATED: { type: GraphQLString },
    PLAYER_PROFILE_VIEWED: { type: GraphQLString },
    NOTE_PROFILE_CREATED: { type: GraphQLString },
    RISK_PROFILE_DATA_CREATED: { type: GraphQLString },
    TRANSFER_IN: { type: GraphQLString },
    NEW_AFFILIATE_ACCOUNT_CREATED: { type: GraphQLString },
    NOTE_PROFILE_REMOVED: { type: GraphQLString },
    INTEREST_RATE: { type: GraphQLString },
    PLAYER_PROFILE_STATUS_CHANGED: { type: GraphQLString },
    ATTACHMENT_ADDED: { type: GraphQLString },
    PLAYER_PROFILE_ACQUISITION_CHANGED: { type: GraphQLString },
    CREDIT_IN: { type: GraphQLString },
    PLAYER_PROFILE_TRANSFER_AVAILABILITY_CHANGED: { type: GraphQLString },
    CREDIT_OUT: { type: GraphQLString },
    FEE: { type: GraphQLString },
    INACTIVITY_FEE: { type: GraphQLString },
    ACCOUNT_CREATED: { type: GraphQLString },
    WITHDRAW: { type: GraphQLString },
    PLAYER_PROFILE_KYC_CHANGED: { type: GraphQLString },
    TRADING_ACCOUNT_READ_ONLY_UPDATED: { type: GraphQLString },
    TRADING_ACCOUNT_ARCHIVED: { type: GraphQLString },
    TRADING_ACCOUNT_LEVERAGE_UPDATED: { type: GraphQLString },
    DEPOSIT: { type: GraphQLString },
    NOTE_PROFILE_UPDATED: { type: GraphQLString },
    PLAYER_PROFILE_VERIFIED_EMAIL: { type: GraphQLString },
    AFFILIATE_ACCOUNT_CREATED: { type: GraphQLString },
    NEW_OPERATOR_ACCOUNT_CREATED: { type: GraphQLString },
    TRANSFER_OUT: { type: GraphQLString },
  }),
});

module.exports = {
  FeedType,
  FeedTypes,
};
