const { GraphQLObjectType } = require('graphql');
const ProfileType = require('./ProfileType');
const OperatorType = require('./OperatorType');
const FileType = require('./FileType');
const UploadType = require('./UploadType');
const LeadsType = require('./LeadsType');
const HierarchyType = require('./HierarchyType');
const RulesType = require('./RulesType');
const ClientsType = require('./ClientsType');
const TradingAccountType = require('./TradingAccountType');
const TradingActivityType = require('./TradingActivityType');

const MutationType = new GraphQLObjectType({
  name: 'ApiMutation',
  fields: () => ({
    profile: {
      type: ProfileType,
      resolve() {
        return {};
      },
    },
    operator: {
      type: OperatorType,
      resolve() {
        return {};
      },
    },
    upload: {
      type: UploadType,
      resolve() {
        return {};
      },
    },
    file: {
      type: FileType,
      resolve() {
        return {};
      },
    },
    leads: {
      type: LeadsType,
      resolve() {
        return {};
      },
    },
    hierarchy: {
      type: HierarchyType,
      resolve() {
        return {};
      },
    },
    rules: {
      type: RulesType,
      resolve() {
        return {};
      },
    },
    clients: {
      type: ClientsType,
      resolve() {
        return {};
      },
    },
    tradingAccount: {
      type: TradingAccountType,
      resolve() {
        return {};
      },
    },
    tradingActivity: {
      type: TradingActivityType,
      resolve() {
        return {};
      },
    },
  }),
});

module.exports = MutationType;
