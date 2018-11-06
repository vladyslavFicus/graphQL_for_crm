const keyMirror = require('keymirror');

const types = {
  SESSION_DURATION: 'session_duration',
  WAGER: 'wager',
  LOSS: 'loss',
  DEPOSIT: 'deposit',
  REGULATION: 'regulation',
};

const statuses = keyMirror({
  PENDING: null,
  IN_PROGRESS: null,
  ACTIVE: null,
  CANCELED: null,
  COOLOFF: null,
});

module.exports = {
  types,
  statuses,
};
