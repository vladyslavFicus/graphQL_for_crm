module.exports = {
  /**
   * Update file meta
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   *
   * @return {Promise<Boolean|*>}
   */
  async updateFileMeta(_, { uuid, ...args }, { dataSources }) {
    await dataSources.AttachmentsAPI.updateFileMeta(uuid, args);
  },

  /**
   * Update file status
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   *
   * @return {Promise<Boolean|*>}
   */
  async updateFileStatus(_, { uuid, ...args }, { dataSources }) {
    await dataSources.AttachmentsAPI.updateFileStatus(uuid, args);
  },

  /**
   * Upload file
   *
   * @param _
   * @param uuid
   * @param formData
   * @param dataSources
   *
   * @return {Promise<Boolean|*>}
   */
  upload(_, { file, uuid }, { dataSources }) {
    return dataSources.AttachmentsAPI.uploadFile(uuid, file);
  },

  /**
   * Confirm files uploading
   *
   * @param _
   * @param profileUuid
   * @param args
   * @param dataSources
   *
   * @return {Promise<Boolean|*>}
   */
  async confirmFilesUploading(_, { profileUuid, ...args }, { dataSources }) {
    await dataSources.AttachmentsAPI.confirmFilesUploading(profileUuid, args);
  },

  /**
   * Delete file status
   *
   * @param _
   * @param uuid
   * @param dataSources
   *
   * @return {Promise<Boolean|*>}
   */
  async delete(_, { uuid }, { dataSources }) {
    await dataSources.AttachmentsAPI.deleteFile(uuid);

    return true;
  },
};
