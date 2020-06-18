const { GraphQLObjectType } = require('graphql');
const ProfileType = require('./ProfileType');
const FileType = require('./FileType');
const UploadType = require('./UploadType');
const HierarchyType = require('./HierarchyType');
const RulesType = require('./RulesType');
const ClientsType = require('./ClientsType');
const TradingAccountType = require('./TradingAccountType');

const MutationType = new GraphQLObjectType({
  name: 'ApiMutation',
  fields: () => ({
    profile: {
      type: ProfileType,
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
  }),
});

module.exports = MutationType;
