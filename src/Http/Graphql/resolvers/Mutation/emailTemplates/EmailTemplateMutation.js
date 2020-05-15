module.exports = {
  sendEmail(_, args, { dataSources }) {
    return dataSources.EmailAPI.sendEmail(args);
  },
  createEmailTemplate(_, args, { dataSources }) {
    return dataSources.EmailAPI.createTemplate(args);
  },
  updateEmailTemplate(_, args, { dataSources }) {
    return dataSources.EmailAPI.updateTemplate(args);
  },
  async deleteEmailTemplate(_, { id }, { dataSources }) {
    await dataSources.EmailAPI.deleteTemplate(id);

    return { id };
  },
};
