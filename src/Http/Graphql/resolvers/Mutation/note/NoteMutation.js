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
  add(_, args, { dataSources }) {
    return dataSources.NoteAPI.addNote(args);
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
  update(_, { noteId, ...args }, { dataSources }) {
    return dataSources.NoteAPI.updateNote(noteId, args);
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

    return { noteId };
  },
};
