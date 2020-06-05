module.exports = {
  _id({ uuid }) {
    return uuid;
  },
  // # TODO: imlement AithAPI2 authorities request
  authorities({ uuid }, _, { dataSources }) {
    // return dataSources.AuthAPI.getAuthorities(uuid);
    return null;
  },
  fullName({ firstName, lastName }) {
    return [firstName, lastName].filter(v => v).join(' ');
  },
};
