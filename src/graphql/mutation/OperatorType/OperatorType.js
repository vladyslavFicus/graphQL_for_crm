const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');
const SuccessType = require('../../query/SuccessType');
const OperatorType = require('../../query/OperatorType');
const { AuthorityType } = require('../../query/AuthType');
const ResponseType = require('../../common/types/ResponseType');
const {
  createOperator,
  updateOperator,
  removeDepartment,
  addDepartment,
  addExistingOperator,
  sendInvitation,
  changeStatus,
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
        userType: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
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
        sip: { type: GraphQLString },
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
    changeStatus: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        reason: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: changeStatus,
    },
    sendInvitation: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: sendInvitation,
    },
  }),
});

module.exports = OperatorMutation;
