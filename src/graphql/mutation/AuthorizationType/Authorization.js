const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const { GraphQLJSONObject } = require('graphql-type-json');
const { signIn, chooseDepartment } = require('../../common/resolvers/authorization');
const { ResponseType } = require('../../common/types');

const AuthorizationMutation = new GraphQLObjectType({
  name: 'AuthorizationMutation',
  fields: () => ({
    signIn: {
      args: {
        login: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(
        new GraphQLObjectType({
          name: 'SignInType',
          fields: () => ({
            uuid: { type: GraphQLString },
            token: { type: GraphQLString },
            departmentsByBrand: { type: GraphQLJSONObject },
          }),
        }),
        'SignIn'
      ),
      resolve: signIn,
    },
    chooseDepartment: {
      args: {
        brandId: { type: new GraphQLNonNull(GraphQLString) },
        department: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(
        new GraphQLObjectType({
          name: 'ChooseDepartmentType',
          fields: () => ({
            uuid: { type: GraphQLString },
            token: { type: GraphQLString },
          }),
        }),
        'ChooseDepartment'
      ),
      resolve: chooseDepartment,
    },
  }),
});

module.exports = AuthorizationMutation;
