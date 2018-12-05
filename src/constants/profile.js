const keyMirror = require('keymirror');

const assignStatuses = keyMirror({
  UN_ASSIGN: null,
  ASSIGN: null,
});

const firstDepositStatuses = keyMirror({
  YES: null,
  NO: null,
});

const aquisitionStatuses = keyMirror({
  RETENTION: null,
  SALES: null,
});

module.exports = {
  aquisitionStatuses,
  assignStatuses,
  firstDepositStatuses,
};
