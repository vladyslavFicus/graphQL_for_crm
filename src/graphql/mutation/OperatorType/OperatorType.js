const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLList } = require('graphql');
const OperatorType = require('../../query/OperatorType');
const { AuthorityType } = require('../../query/AuthType');
const ResponseType = require('../../common/types/ResponseType');
const {
  createOperator,
  updateOperator,
  removeDepartment,
  addDepartment,
  addExistingOperator,
} = require('../../common/resolvers/operators');

const OperatorTypeAuthorities = new GraphQLObjectType({
  name: 'OperatorTypeAuthorities',
  fields: () => ({
    authorities: { type: new GraphQLList(AuthorityType) },
  }),
});

const OperatorTypeExisting = new GraphQLObjectType({
  name: 'OperatorTypeExisting',
  fields: () => ({
    uuid: { type: GraphQLString },
  }),
});

const OperatorMutation = new GraphQLObjectType({
  name: 'OperatorMutation',
  fields: () => ({
    createOperator: {
      args: {
        branchId: { type: GraphQLString },
        department: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLString },
        role: { type: new GraphQLNonNull(GraphQLString) },
        sendMail: { type: new GraphQLNonNull(GraphQLBoolean) },
        userType: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(OperatorType, 'CreatedOperatorType'),
      resolve: createOperator,
    },
    updateOperator: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: GraphQLString },
        country: { type: GraphQLString },
      },
      type: ResponseType(OperatorType, 'UpdatedOperatorType'),
      resolve: updateOperator,
    },
    removeDepartment: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        department: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(OperatorTypeAuthorities, 'OperatorTypeRemovedDepartment'),
      resolve: removeDepartment,
    },
    addDepartment: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        department: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(OperatorTypeAuthorities, 'OperatorTypeAddedDepartment'),
      resolve: addDepartment,
    },
    addExistingOperator: {
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        department: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
        branchId: { type: GraphQLString },
      },
      type: ResponseType(OperatorTypeExisting, 'OperatorTypeAddExisting'),
      resolve: addExistingOperator,
    },
  }),
});

module.exports = OperatorMutation;
