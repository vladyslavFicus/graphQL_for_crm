const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class EmailAPI extends RESTDataSource {
  /**
   * Get email template
   *
   * @param id
   *
   * @return {Promise}
   */
  getTemplate(id) {
    return this.get(`/templates/${id}`);
  }

  /**
   * Get email templates list
   *
   * @return {Promise}
   */
  getTemplates() {
    return this.get('/templates');
  }

  /**
   * Create email template
   *
   * @param args
   *
   * @return {Promise}
   */
  createTemplate(args) {
    return this.post('/templates', args);
  }

  /**
   * Update email template
   *
   * @param args
   *
   * @return {Promise}
   */
  updateTemplate(args) {
    return this.put('/templates', args);
  }

  /**
   * Delete email template
   *
   * @param id
   *
   * @return {Promise}
   */
  deleteTemplate(id) {
    return this.delete(`/templates/${id}`);
  }

  /**
   * Send email
   *
   * @param args
   *
   * @return {Promise}
   */
  sendEmail(args) {
    return this.post('/templated-email', args);
  }
}

module.exports = EmailAPI;
