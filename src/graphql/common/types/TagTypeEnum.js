const { GraphQLEnumType } = require('graphql');

const TagTypeEnum = new GraphQLEnumType({
  name: 'tagTypes',
  values: {
    NOTE: { value: 'NOTE' },
    TAG: { value: 'TAG' },
  },
});

module.exports = TagTypeEnum;
