module.exports = {
  additionalFields(source, args, { dataSources }) {
    // Get additional config for CLEAR VOICE provider
    if (source.callSystem === 'CLEAR_VOICE') {
      return dataSources.Click2CallAPI.getConfigProvider({ callSystem: source.callSystem, ...args });
    }

    return null;
  },
};
