const { makeExecutableSchema } = require('apollo-server-express');
const { autoloadTypeDefs, autoloadResolvers } = require('@hrzn/apollo-autoload');
const { NestedDirective, PageableDirective } = require('@hrzn/apollo-directive');
const AuthMaskFieldDirective = require('./directives/auth/AuthMaskFieldDirective');
const AuthHideArgumentDirective = require('./directives/auth/AuthHideArgumentDirective');
const AuthHideFieldDirective = require('./directives/auth/AuthHideFieldDirective');

const schema = makeExecutableSchema({
  typeDefs: autoloadTypeDefs(`${__dirname}/typeDefs`),
  resolvers: autoloadResolvers(`${__dirname}/resolvers`),
  schemaDirectives: {
    nested: NestedDirective,
    pageable: PageableDirective,
    auth_mask_field: AuthMaskFieldDirective,
    auth_hide_argument: AuthHideArgumentDirective,
    auth_hide_field: AuthHideFieldDirective,
  },
});

module.exports = schema;
