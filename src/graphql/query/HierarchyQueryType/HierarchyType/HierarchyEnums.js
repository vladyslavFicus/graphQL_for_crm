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

module.exports = {
  BranchTypeEnum,
  DeskTypeEnum,
};
