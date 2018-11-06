const keyMirror = require('keymirror');

const statuses = keyMirror({
  INACTIVE: null,
  ACTIVE: null,
  BLOCKED: null,
  SUSPENDED: null,
  PERMANENT_SUSPENDED: null,
  COOLOFF: null,
  MANUAL_COOLOFF: null,
});

module.exports = { statuses };
