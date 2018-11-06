const { GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLID, GraphQLEnumType } = require('graphql');

const ConditionalTagStatusEnum = new GraphQLEnumType({
  name: 'ConditionalTagStatusStatus',
  values: {
    ACTIVE: { value: 'ACTIVE' },
    DISABLED: { value: 'DISABLED' },
  },
});

const ConditionalTagTypeEnum = new GraphQLEnumType({
  name: 'ConditionalTagType',
  values: {
    EMAIL: { value: 'EMAIL' },
  },
});

const ConditionalTagType = new GraphQLObjectType({
  name: 'ConditionalTag',
  fields() {
    return {
      _id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve({ uuid }) {
          return uuid;
        },
      },
      uuid: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLString },
      tag: { type: GraphQLString },
      conditionType: { type: ConditionalTagTypeEnum },
      conditionStatus: { type: ConditionalTagStatusEnum },
      count: { type: new GraphQLNonNull(GraphQLInt) },
    };
  },
});

module.exports = {
  ConditionalTagType,
  ConditionalTagTypeEnum,
  ConditionalTagStatusEnum,
};
