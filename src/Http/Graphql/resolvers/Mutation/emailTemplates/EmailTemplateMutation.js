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
  sendEmail(_, args, { dataSources }) {
    return dataSources.EmailAPI.sendEmail(args);
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
  createEmailTemplate(_, args, { dataSources }) {
    return dataSources.EmailAPI.createTemplate(args);
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
  updateEmailTemplate(_, args, { dataSources }) {
    return dataSources.EmailAPI.updateTemplate(args);
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
    return { id };
  },
};
