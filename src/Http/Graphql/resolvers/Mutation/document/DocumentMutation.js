module.exports = {
  /**
   * Add Document
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  add(_, { file }, { dataSources }) {
    return dataSources.AttachmentsAPI.documentAdd(file);
  },

  /**
   * Confirm Document
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  confirm(_, { args }, { dataSources }) {
    dataSources.AttachmentsAPI.documentConfirm(args);

    return true;
  },

  /**
   * Delete Document
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async delete(_, args, { dataSources }) {
    await dataSources.AttachmentsAPI.documentDelete(args);

    return true;
  },

  /**
   * Update Document
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async edit(_, { args }, { dataSources }) {
    await dataSources.AttachmentsAPI.documentUpdate(args);
    return true;
  },
};
