module.exports = {
  /**
   * Add note
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<Note|*>}
   */
  add(_, args, { dataSources }) {
    return dataSources.NoteAPI.addNote(args);
  },

  /**
   * Update note
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<Note|*>}
   */
  update(_, { noteId, ...args }, { dataSources }) {
    return dataSources.NoteAPI.updateNote(args);
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
