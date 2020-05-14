const { makeExecutableSchema, mergeSchemas } = require('apollo-server-express');
const { autoloadTypeDefs, autoloadResolvers } = require('@hrzn/apollo-autoload');
const { NestedDirective, PageableDirective } = require('@hrzn/apollo-directive');
const oldSchema = require('../../graphql/schema');
const ResponseDirective = require('./directives/ResponseDirective');

const newSchema = makeExecutableSchema({
  typeDefs: autoloadTypeDefs(`${__dirname}/typeDefs`),
  resolvers: autoloadResolvers(`${__dirname}/resolvers`),
  schemaDirectives: {
    nested: NestedDirective,
    pageable: PageableDirective,
    response: ResponseDirective,
  },
});

const schema = mergeSchemas({
  schemas: [oldSchema, newSchema],
});

module.exports = schema;
