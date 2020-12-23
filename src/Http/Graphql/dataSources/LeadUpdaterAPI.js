const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');
const FormData = require('form-data');

class LeadUpdaterAPI extends RESTDataSource {
  /**
   * Update lead
   *
   * @param uuid Lead UUID
   * @param args
   *
   * @return {Promise}
   */
  updateLead(uuid, args) {
    return this.put(`/lead/${uuid}`, args);
  }

  /**
   * Upload leads (csv)
   *
   * @param file
   *
   * @return {Promise}
   */
  uploadLeads(file) {
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
          const response = await this.post('/lead/file', formData, {
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
}

module.exports = LeadUpdaterAPI;
