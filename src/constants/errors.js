const errors = {
  ENTITY_NOT_FOUND: 'error.entity.not.found',
  INTERNAL: 'error.internal',
  UNAUTHORIZED: 'error.unauthorized',
};

const mapErrorsCodes = {
  404: errors.ENTITY_NOT_FOUND,
  500: errors.INTERNAL,
  401: errors.UNAUTHORIZED,
};

module.exports = {
  ...errors,
  mapErrorsCodes,
};
