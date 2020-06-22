const FormData = require('form-data');

module.exports = {
  /**
   * Update file meta
   *
   * @param uuid
   * @param args
   *
   * @return {Promise<Boolean|*>}
   */
  async updateFileMeta(_, { uuid, ...args }, { dataSources }) {
    await dataSources.AttachmentsAPI.updateFileMeta(uuid, args);
    return true;
  },

  /**
   * Update file status
   *
   * @param uuid
   * @param args
   *
   * @return {Promise<Boolean|*>}
   */
  async updateFileStatus(_, { uuid, ...args }, { dataSources }) {
    await dataSources.AttachmentsAPI.updateFileStatus(uuid, args);
  },

  /**
   * Upload file
   *
   * @param uuid
   * @param formData
   *
   * @return {Promise<Boolean|*>}
   */
  upload(_, { file, uuid }, { dataSources }) {
    return dataSources.AttachmentsAPI.uploadFile(file, uuid);
  },

  /**
   * Confirm files uploading
   *
   * @param profileUuid
   * @param args
   *
   * @return {Promise<Boolean|*>}
   */
  async confirmFilesUploading(_, { profileUuid, ...args }, { dataSources }) {
    await dataSources.AttachmentsAPI.confirmFilesUploading(profileUuid, args);
    return true;
  },

  /**
   * Delete file status
   *
   * @param uuid
   *
   * @return {Promise<Boolean|*>}
   */
  async delete(_, { uuid }, { dataSources }) {
    await dataSources.AttachmentsAPI.deleteFile(uuid);
    return true;
  },
};
