module.exports = {
  /**
   * Sign in
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<SignIn>}
   */
  signIn(_, args, { dataSources }) {
    return dataSources.Auth2API.signIn(args);
  },

  /**
   * Choose department
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<ChooseDepartment>}
   */
  chooseDepartment(_, args, { dataSources }) {
    return dataSources.Auth2API.chooseDepartment(args);
  },
};
