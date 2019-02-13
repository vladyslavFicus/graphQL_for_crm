const { GraphQLObjectType } = require('graphql');
const AuthType = require('./AuthType');
const ProfileType = require('./ProfileType');
const NoteType = require('./NoteType');
const { PaymentType } = require('./PaymentType');
const TagType = require('./TagType');
const FileType = require('./FileType');
const UploadType = require('./UploadType');
const LeadsType = require('./LeadsType');
const HierarchyType = require('./HierarchyType');
const RulesType = require('./RulesType');
const ClientsType = require('./ClientsType');
const ConditionalTagType = require('./ConditionalTagType');
const TradingAccountType = require('./TradingAccountType');
const CallbacksType = require('./CallbacksType');

const MutationType = new GraphQLObjectType({
  name: 'ApiMutation',
  fields: () => ({
    auth: {
      type: AuthType,
      resolve() {
        return {};
      },
    },
    profile: {
      type: ProfileType,
      resolve() {
        return {};
      },
    },
    note: {
      type: NoteType,
      resolve() {
        return {};
      },
    },
    payment: {
      type: PaymentType,
      resolve() {
        return {};
      },
    },
    tag: {
      type: TagType,
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
    conditionalTag: {
      type: ConditionalTagType,
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
    callback: {
      type: CallbacksType,
      resolve() {
        return {};
      },
    },
  }),
});

module.exports = MutationType;
