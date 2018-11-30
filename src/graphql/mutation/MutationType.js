const { GraphQLObjectType } = require('graphql');
const AuthType = require('./AuthType');
const ProfileType = require('./ProfileType');
const NoteType = require('./NoteType');
const { PaymentType } = require('./PaymentType');
const PaymentLimitType = require('./PaymentLimit');
const TagType = require('./TagType');
const CampaignType = require('./CampaignType');
const BonusTemplateType = require('./BonusTemplateType');
const FreeSpinTemplateType = require('./FreeSpinTemplateType');
const FreeSpinType = require('./FreeSpinType');
const WageringFulfillmentType = require('./WageringFulfillmentType');
const DepositFulfillmentMutationType = require('./DepositFulfillmentMutationType');
const GamingFulfillmentMutationType = require('./GamingFulfillmentMutationType');
const FileType = require('./FileType');
const { ActiveRewardPlan, PendingRewardPlan } = require('./RewardPlanMutationType');
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
    paymentLimit: {
      type: PaymentLimitType,
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
    campaign: {
      type: CampaignType,
      resolve() {
        return {};
      },
    },
    bonusTemplate: {
      type: BonusTemplateType,
      resolve() {
        return {};
      },
    },
    freeSpinTemplate: {
      type: FreeSpinTemplateType,
      resolve() {
        return {};
      },
    },
    freeSpin: {
      type: FreeSpinType,
      resolve() {
        return {};
      },
    },
    wageringFulfillment: {
      type: WageringFulfillmentType,
      resolve() {
        return {};
      },
    },
    depositFulfillment: {
      type: DepositFulfillmentMutationType,
      resolve() {
        return {};
      },
    },
    gamingFulfillment: {
      type: GamingFulfillmentMutationType,
      resolve() {
        return {};
      },
    },
    activeRewardPlan: {
      type: ActiveRewardPlan,
      resolve() {
        return {};
      },
    },
    pendingRewardPlan: {
      type: PendingRewardPlan,
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
