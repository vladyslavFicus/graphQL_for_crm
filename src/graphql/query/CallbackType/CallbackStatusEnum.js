const { GraphQLEnumType } = require('graphql');

const CallbackStatusEnum = new GraphQLEnumType({
  name: 'CallbackStatusEnum',
  values: {
    SUCCESS: { value: 'SUCCESS' },
    PENDING: { value: 'PENDING' },
    REJECTED: { value: 'REJECTED' },
  },
});

module.exports = CallbackStatusEnum;
