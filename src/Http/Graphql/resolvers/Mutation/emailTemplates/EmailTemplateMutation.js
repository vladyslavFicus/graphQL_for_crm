module.exports = {
  /**
   * Send email action
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async sendEmail(_, args, { dataSources }) {
    await dataSources.EmailAPI.sendEmail(args);
  },

  /**
   * Create email template
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async createEmailTemplate(_, args, { dataSources }) {
    await dataSources.EmailAPI.createTemplate(args);
  },

  /**
   * Update email template
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async updateEmailTemplate(_, args, { dataSources }) {
    await dataSources.EmailAPI.updateTemplate(args);
  },

  /**
   * Delete email template
   *
   * @param _
   * @param id (email template uuid)
   * @param dataSources
   *
   * @return {Promise}
   */
  async deleteEmailTemplate(_, { id }, { dataSources }) {
    await dataSources.EmailAPI.deleteTemplate(id);
  },
};
