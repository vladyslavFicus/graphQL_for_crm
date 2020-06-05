const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class Auth2API extends RESTDataSource {
  /**
   * Sign in operator
   *
   * @param args
   *
   * @return {Promise}
   */
  signIn(args) {
    return this.post('/operator/signin', args);
  }

  /**
   * Choose department after sign in
   *
   * @param args
   *
   * @return {Promise}
   */
  chooseDepartment(args) {
    return this.post('/operator/department', args);
  }
}

module.exports = Auth2API;
