const DataLoader = require('dataloader');
const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');
const orderByArray = require('../../../utils/orderByArray');

class NoteAPI extends RESTDataSource {
  constructor(args) {
    super(args);

    this.loader = new DataLoader(this._loader.bind(this));
  }

  async _loader(targetUUIDs) {
    const data = await this.getNotes({ targetUUIDs, size: targetUUIDs.length });

    return orderByArray(targetUUIDs, data.content, 'targetUUID');
  }

  /**
   * Get note
   *
   * @param targetUUID Target UUID
   *
   * @return {Promise}
   */
  getNote(targetUUID) {
    return targetUUID && this.loader.load(targetUUID);
  }

  /**
   * Get notes
   *
   * @param page
   * @param size
   * @param args
   *
   * @return {Promise}
   */
  getNotes({ page, size, ...args }) {
    return this.post(`/search?size=${size}&page=${page}`, args);
  }

  /**
   * Add note
   *
   * @param args
   *
   * @return {Promise}
   */
  addNote(args) {
    return this.post('/', args);
  }

  /**
   * Update note
   *
   * @param noteId
   * @param args
   *
   * @return {Promise}
   */
  updateNote(noteId, args) {
    return this.put(`/${noteId}`, args);
  }

  /**
   * Remove note
   *
   * @param noteId
   *
   * @return {Promise}
   */
  removeNote(noteId) {
    return this.delete(`/${noteId}`);
  }
}

module.exports = NoteAPI;
