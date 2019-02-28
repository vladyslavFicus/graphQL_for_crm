const { GraphQLObjectType } = require('graphql');
const OperatorTypeFields = require('../OperatorType/OperatorTypeFields');
const { getForexOperatorByUUID } = require('../../common/resolvers/partners');
const ForexOperatorType = require('../ForexOperatorType');
const ResponseType = require('../../common/types/ResponseType');

module.exports = new GraphQLObjectType({
  name: 'PartnerType',
  fields: () => ({
    ...OperatorTypeFields,
    forexOperator: {
      type: ResponseType(ForexOperatorType),
      resolve: getForexOperatorByUUID,
    },
  }),
});
