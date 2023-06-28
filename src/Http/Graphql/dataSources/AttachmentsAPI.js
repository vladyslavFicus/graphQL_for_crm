const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');
const FormData = require('form-data');

class AttachmentsAPI extends RESTDataSource {
  /**
   * Get files
   *
   * @param args
   *
   * @return {Promise}
   */
  getFiles(args) {
    return this.post('/search', args);
  }

  /**
   * Get client's files
   *
   * @param uuid | clientUuid
   *
   * @return {Promise}
   */
  getClientFiles(uuid) {
    return this.get(`/verification/users/${uuid}`);
  }

  /**
   * Get files categories
   *
   * @return {Promise}
   */
  getFilesCategories() {
    return this.get('/verification/types/mapping');
  }

  /**
   * Update file meta
   *
   * @param uuid
   * @param args
   *
   * @return {Promise}
   */
  updateFileMeta(uuid, args) {
    return this.put(`/admin/files/${uuid}`, args);
  }

  /**
   * Update file status
   *
   * @param uuid
   * @param args
   *
   * @return {Promise}
   */
  updateFileStatus(uuid, args) {
    return this.put(`/verification/users/${uuid}/status`, args);
  }

  /**
   * Upload file
   *
   * @param uuid Client uuid
   * @param file
   *
   * @return {Promise}
   */
  uploadFile(uuid, file) {
    return new Promise(async (resolve, reject) => {
      const { filename, createReadStream } = await file.file;

      const buffer = [];
      const stream = createReadStream();

      stream.on('data', (chunk) => {
        buffer.push(chunk);
      });

      stream.on('end', async () => {
        const formData = new FormData();

        formData.append('file', Buffer.concat(buffer), filename);

        try {
          const response = await this.post(`/users/${uuid}/files`, formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });

          resolve(response);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  /**
   * Confirm file uploading
   *
   * @param uuid
   * @param args
   *
   * @return {Promise}
   */
  confirmFilesUploading(uuid, args) {
    return this.post(`/admin/users/${uuid}/files/confirm`, args);
  }

  /**
   * Delete file
   *
   * @param uuid
   *
   * @return {Promise}
   */
  deleteFile(uuid) {
    return this.delete(`/admin/files/${uuid}`);
  }


  /**
   * Get Documents
   *
   * @param args
   *
   * @return {Promise}
   */
  documentSearch(args) {
    return this.post('/documents/search', args);
  }

  documentAdd(file) {
    return new Promise(async (resolve, reject) => {
      const { filename, createReadStream } = await file.file;

      const buffer = [];
      const stream = createReadStream();

      stream.on('data', (chunk) => {
        buffer.push(chunk);
      });

      stream.on('end', async () => {
        const formData = new FormData();

        formData.append('file', Buffer.concat(buffer), filename);

        try {
          const response = await this.post('/documents', formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
          resolve(response);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  documentDelete(args) {
    return this.delete(`/documents/${args.uuid}`);
  }

  documentUpdate(args) {
    return this.put(`/documents/${args.uuid}`, args);
  }

  documentConfirm(args) {
    const { uuid, title, description } = args;

    return this.post(`/documents/${uuid}/confirm`, {
      title,
      description,
    });
  }
}

module.exports = AttachmentsAPI;
