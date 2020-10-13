const getFieldByType = require('../../../utils/getFieldByType');

module.exports = {
  /**
   * Send email action
   *
   * @param _
   * @param uuid
   * @param field
   * @param type
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async sendEmail(_, { uuid, field, type, ...args }, { dataSources }) {
    const toEmail = await getFieldByType(uuid, field, type, dataSources);

    await dataSources.EmailAPI.sendEmail({ ...args, userUuid: uuid, toEmail });
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
