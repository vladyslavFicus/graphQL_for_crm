const keyMirror = require('keymirror');

const statuses = keyMirror({
  UN_ASSIGN: null,
  ASSIGN: null,
});

const aquisitionStatuses = keyMirror({
  RETENTION: null,
  SALES: null,
});

module.exports = { statuses, aquisitionStatuses };
