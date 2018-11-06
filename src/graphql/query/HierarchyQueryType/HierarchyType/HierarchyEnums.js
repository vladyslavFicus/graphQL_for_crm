const { GraphQLEnumType } = require('graphql');

const BranchTypeEnum = new GraphQLEnumType({
  name: 'BranchTypeEnum',
  values: {
    COMPANY: { value: 'COMPANY' },
    BRAND: { value: 'BRAND' },
    OFFICE: { value: 'OFFICE' },
    DESK: { value: 'DESK' },
    TEAM: { value: 'TEAM' },
  },
});

const DeskTypeEnum = new GraphQLEnumType({
  name: 'DeskTypeEnum',
  values: {
    RETENTION: { value: 'RETENTION' },
    SALES: { value: 'SALES' },
    NINJA: { value: 'NINJA' },
  },
});

const DeskDefaultFlagEnum = new GraphQLEnumType({
  name: 'DeskDefaultFlagEnum',
  values: {
    ANY: { value: 'ANY' },
    NO: { value: 'NO' },
    YES: { value: 'YES' },
  },
});

module.exports = {
  BranchTypeEnum,
  DeskTypeEnum,
  DeskDefaultFlagEnum,
};
