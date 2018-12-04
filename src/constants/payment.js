const keyMirror = require('keymirror');

const PAYMENT_TYPES = {
  DEPOSIT: 'DEPOSIT',
  CONFISCATE: 'CONFISCATE',
  WITHDRAW: 'WITHDRAW',
  TRANSFER: 'TRANSFER',
  CREDIT_IN: 'CREDIT_IN',
  CREDIT_OUT: 'CREDIT_OUT',
};

const statuses = keyMirror({
  APPROVED: null,
  PENDING: null,
  REFUSED: null,
  FAILED: null,
  COMPLETED: null,
  CHARGEBACK: null,
  CREATED: null,
  SUBMITTED: null,
});

const paymentActions = {
  REJECT: 'refuse',
  CHARGEBACK: 'chargeback',
  APPROVE: 'approve',
};

const mapActionToStatus = {
  [paymentActions.REJECT]: statuses.REFUSED,
  [paymentActions.CHARGEBACK]: statuses.CHARGEBACK,
  [paymentActions.APPROVE]: statuses.APPROVED,
};

module.exports = {
  PAYMENT_TYPES,
  mapActionToStatus,
};
