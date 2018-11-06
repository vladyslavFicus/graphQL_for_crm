const { get } = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
const MoneyType = require('../../common/types/MoneyType');
const { getRates } = require('../../common/resolvers/payment');

const currency = {
  type: new GraphQLObjectType({
    name: 'currency',
    fields: () => ({
      base: { type: new GraphQLNonNull(GraphQLString) },
      list: { type: new GraphQLList(GraphQLString) },
      rates: {
        type: new GraphQLList(MoneyType),
        resolve: ({ brandId }) =>
          brandId ? getRates(null, { brandId }).then(response => get(response, 'rates', [])) : [],
      },
    }),
  }),
  resolve: object => ({ ...object.currency, brandId: object.brandId }),
};
const country = {
  type: new GraphQLObjectType({
    name: 'country',
    fields: () => ({
      list: {
        type: new GraphQLList(
          new GraphQLObjectType({
            name: 'countryList',
            fields: () => ({
              countryCode: { type: new GraphQLNonNull(GraphQLString) },
              phoneCode: { type: new GraphQLNonNull(GraphQLString) },
            }),
          })
        ),
      },
    }),
  }),
};
const phoneCode = {
  type: new GraphQLObjectType({
    name: 'phoneCode',
    fields: () => ({
      list: {
        type: new GraphQLList(GraphQLString),
        resolve(object) {
          return object.list.filter((item, index, self) => self.indexOf(item) === index).sort();
        },
      },
    }),
  }),
};

const SignUpOptionsType = new GraphQLObjectType({
  name: 'SignUpOptions',
  fields: () => ({
    brandId: { type: new GraphQLNonNull(GraphQLString) },
    geoLocation: {
      type: new GraphQLObjectType({
        name: 'geoLocation',
        fields: () => ({
          country: { type: GraphQLString },
          ip: { type: GraphQLString },
          phoneCode: { type: GraphQLString },
        }),
      }),
    },
    post: {
      type: new GraphQLObjectType({
        name: 'post',
        fields: () => ({
          passwordPattern: {
            type: new GraphQLNonNull(GraphQLString),
            resolve(object) {
              return get(object, 'password.pattern');
            },
          },
          currency,
          country,
          phoneCode,
        }),
      }),
      resolve: object => ({ ...object.post, brandId: object.brandId }),
    },
  }),
});

module.exports = SignUpOptionsType;
