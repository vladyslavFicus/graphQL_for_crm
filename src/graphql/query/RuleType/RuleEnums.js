const { GraphQLEnumType } = require('graphql');

const RuleTypeEnum = new GraphQLEnumType({
  name: 'RuleTypeEnum',
  values: {
    PROFILE: { value: 'PROFILE' },
    LEAD: { value: 'LEAD' },
  },
});

const RuleActionTypeEnum = new GraphQLEnumType({
  name: 'RuleActionTypeEnum',
  values: {
    DEFAULT: { value: 'DEFAULT' },
    ROUND_ROBIN: { value: 'ROUND_ROBIN' },
  },
});

module.exports = {
  RuleTypeEnum,
  RuleActionTypeEnum,
};
