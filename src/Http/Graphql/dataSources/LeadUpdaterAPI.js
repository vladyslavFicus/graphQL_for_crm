const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');
const FormData = require('form-data');
const buildQueryString = require('../../../utils/buildQueryString');

class LeadUpdaterAPI extends RESTDataSource {
  /**
   * Update lead
   *
   * @param uuid | leadUuid
   * @param args
   *
   * @return {Promise}
   */
  updateLead(uuid, args) {
    return this.put(`/lead/${uuid}`, args);
  }

  /**
   * Update lead sales agent and sales status assign
   *
   * @param args
   *
   * @return {Promise}
   */
  bulkLeadUpdate(args) {
    return this.put('/bulk/lead/sales-status', args);
  }

  /**
   * Upload leads (csv)
   *
   * @param file
   * @param brandId
   *
   * @return {Promise}
   */
  uploadLeads(file, brandId) {
    return new Promise(async (resolve, reject) => {
      const { filename, createReadStream } = await file.file;

      const buffer = [];
      const stream = createReadStream();

      stream.on('data', chunk => {
        buffer.push(chunk);
      });

      stream.on('end', async () => {
        const formData = new FormData();

        formData.append('file', Buffer.concat(buffer), filename);

        try {
          const response = await this.post(`/lead/csv?${buildQueryString({ brandId })}`, formData, {
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
