module.exports = {
  /**
   * Add note
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async add(_, args, { dataSources }) {
    await dataSources.NoteAPI.addNote(args);
 
    return true;
  },

  /**
   * Update note
   *
   * @param _
   * @param noteId
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async update(_, { noteId, ...args }, { dataSources }) {
    await dataSources.NoteAPI.updateNote(noteId, args);
    
    return true;
  },

  /**
   * Remove note
   *
   * @param _
   * @param noteId
   * @param dataSources
   *
   * @return {Promise<{noteId: String}|*>}
   */
  async remove(_, { noteId }, { dataSources }) {
    await dataSources.NoteAPI.removeNote(noteId);

    return true;
  },
};
