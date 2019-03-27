const keyMirror = require('keymirror');

const operatorTypes = keyMirror({
  ACTIVE: null,
  INACTIVE: null,
  CLOSED: null,
});

module.exports = {
  operatorTypes,
};
