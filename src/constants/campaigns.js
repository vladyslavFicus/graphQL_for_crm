const keyMirror = require('keymirror');

const countryStrategies = keyMirror({
  INCLUDE: null,
  EXCLUDE: null,
});

const rewardTypes = keyMirror({
  BONUS: null,
  FREE_SPIN: null,
  TAG: null,
});
const fulfillmentsTypes = keyMirror({
  DEPOSIT: null,
  WAGERING: null,
  GAMING: null,
  PROFILE_COMPLETED: null,
});

const simpleFulfillmentTypes = [fulfillmentsTypes.PROFILE_COMPLETED];

const statusesReasons = keyMirror({
  CANCELED: null,
});

const customValueFieldTypes = {
  ABSOLUTE: 'ABSOLUTE',
  PERCENTAGE: 'PERCENTAGE',
};

const wageringRequirementTypes = keyMirror({
  ABSOLUTE: null,
  BONUS: null,
  DEPOSIT: null,
  BONUS_PLUS_DEPOSIT: null,
});

const isSimpleFulfillmentType = type => simpleFulfillmentTypes.indexOf(type) !== -1;

module.exports = {
  countryStrategies,
  statusesReasons,
  wageringRequirementTypes,
  customValueFieldTypes,
  rewardTypes,
  fulfillmentsTypes,
  isSimpleFulfillmentType,
};
