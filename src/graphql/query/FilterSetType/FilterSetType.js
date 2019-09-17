const {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql');

const FilterSetType = new GraphQLObjectType({
  name: 'FilterSetType',
  fields: () => ({
    favourite: { type: new GraphQLList(FilterType) },
    common: { type: new GraphQLList(FilterType) },
  }),
});

const FilterType = new GraphQLObjectType({
  name: 'FilterType',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    favourite: { type: GraphQLBoolean },
  }),
});

const FilterSetTypeEnum = new GraphQLEnumType({
  name: 'FilterSetTypeEnum',
  values: {
    CLIENT: { value: 'CLIENT' },
    PAYMENT: { value: 'PAYMENT' },
    LEAD: { value: 'LEAD' },
  },
});

module.exports = FilterSetType;
module.exports.FilterType = FilterType;
module.exports.FilterSetTypeEnum = FilterSetTypeEnum;
