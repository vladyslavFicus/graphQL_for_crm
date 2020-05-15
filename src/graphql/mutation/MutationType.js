const { GraphQLObjectType } = require('graphql');
const AuthType = require('./AuthType');
const AuthorizationType = require('./AuthorizationType');
const ProfileType = require('./ProfileType');
const OperatorType = require('./OperatorType');
const PartnerType = require('./PartnerType');
const NoteType = require('./NoteType');
const { PaymentType } = require('./PaymentType');
const FileType = require('./FileType');
const UploadType = require('./UploadType');
const LeadsType = require('./LeadsType');
const HierarchyType = require('./HierarchyType');
const RulesType = require('./RulesType');
const RisksType = require('./RisksType');
const ClientsType = require('./ClientsType');
const TradingAccountType = require('./TradingAccountType');
const TradingActivityType = require('./TradingActivityType');
const CallbacksType = require('./CallbacksType');
const QuestionnaireType = require('./QuestionnaireType');
const FilterSetType = require('./FilterSetType');
const BrandConfigType = require('./BrandConfigType');
const EmailTemplatesType = require('./EmailTemplatesType');

const MutationType = new GraphQLObjectType({
  name: 'ApiMutation',
  fields: () => ({
    authorization: {
      type: AuthorizationType,
      resolve() {
        return {};
      },
    },
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
    operator: {
      type: OperatorType,
      resolve() {
        return {};
      },
    },
    partner: {
      type: PartnerType,
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
    risks: {
      type: RisksType,
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
    callback: {
      type: CallbacksType,
      resolve() {
        return {};
      },
    },
    questionnaire: {
      type: QuestionnaireType,
      resolve() {
        return {};
      },
    },
    filterSet: {
      type: FilterSetType,
      resolve() {
        return {};
      },
    },
    brandConfig: {
      type: BrandConfigType,
      resolve() {
        return {};
      },
    },
    emailTemplates: {
      type: EmailTemplatesType,
      resolve() {
        return {};
      },
    },
  }),
});

module.exports = MutationType;
