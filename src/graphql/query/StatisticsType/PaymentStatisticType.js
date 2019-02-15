const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLInputObjectType,
} = require('graphql');

const commonTotalFields = {
  totalAmount: { type: GraphQLFloat },
  totalCount: { type: GraphQLInt },
};

const DetalizationEnum = new GraphQLEnumType({
  name: 'detalizationEnum',
  values: {
    PER_DAYS: { value: 'PER_DAYS' },
    PER_HOURS: { value: 'PER_HOURS' },
    PER_MINUTES: { value: 'PER_MINUTES' },
  },
});

const AdditionalStatisticInputType = new GraphQLInputObjectType({
  name: 'additionalStatisticInput',
  fields: () => ({
    dateFrom: { type: GraphQLString },
    dateTo: { type: GraphQLString },
  }),
});

const PaymentEntryType = new GraphQLObjectType({
  name: 'PaymentEntry',
  fields: () => ({
    amount: { type: GraphQLFloat },
    count: { type: GraphQLInt },
    entryDate: { type: GraphQLString },
  }),
});

const TotalType = new GraphQLObjectType({
  name: 'TotalType',
  fields: () => ({
    ...commonTotalFields,
    todayAmount: { type: GraphQLFloat },
    todayCount: { type: GraphQLInt },
    monthAmount: { type: GraphQLFloat },
    monthCount: { type: GraphQLInt },
  }),
});

const ItemTotalType = new GraphQLObjectType({
  name: 'ItemTotalType',
  fields: () => commonTotalFields,
});

const PaymentsStatisticType = new GraphQLObjectType({
  name: 'PaymentsStatistic',
  fields: () => ({
    items: { type: new GraphQLList(PaymentEntryType) },
    itemsTotal: { type: ItemTotalType },
    additionalTotal: { type: TotalType },
  }),
});

module.exports = PaymentsStatisticType;
module.exports.DetalizationEnum = DetalizationEnum;
module.exports.AdditionalStatisticInputType = AdditionalStatisticInputType;
