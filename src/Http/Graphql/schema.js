const { makeExecutableSchema } = require('apollo-server-express');
const { autoloadTypeDefs, autoloadResolvers } = require('@hrzn/apollo-autoload');
const { NestedDirective, PageableDirective } = require('@hrzn/apollo-directive');
const AuthMaskFieldDirective = require('./directives/auth/AuthMaskFieldDirective');
const AuthHideArgumentDirective = require('./directives/auth/AuthHideArgumentDirective');
const AuthHideFieldDirective = require('./directives/auth/AuthHideFieldDirective');
const AuthFilterValuesDirective = require('./directives/auth/AuthFilterValuesDirective');
const MaskFieldDirective = require('./directives/mask/MaskFieldDirective');
const MaskFeedsPhoneFieldDirective = require('./directives/mask/MaskFeedsPhoneField');

const schema = makeExecutableSchema({
  typeDefs: autoloadTypeDefs(`${__dirname}/typeDefs`),
  resolvers: autoloadResolvers(`${__dirname}/resolvers`),
  schemaDirectives: {
    nested: NestedDirective,
    pageable: PageableDirective,
    auth_mask_field: AuthMaskFieldDirective,
    mask_field: MaskFieldDirective,
    mask_feeds_phone: MaskFeedsPhoneFieldDirective,
    auth_hide_argument: AuthHideArgumentDirective,
    auth_hide_field: AuthHideFieldDirective,
    auth_filter_values: AuthFilterValuesDirective,
  },
});

module.exports = schema;
