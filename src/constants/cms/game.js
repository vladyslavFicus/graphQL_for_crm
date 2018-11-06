const keyMirror = require('keymirror');

const statuses = keyMirror({
  inactive: null,
  active: null,
});
const freeSpinsStatuses = keyMirror({
  not_available: null,
  available: null,
  active: null,
});
const platforms = keyMirror({
  DESKTOP: null,
  MOBILE: null,
  DESKTOP_AND_MOBILE: null,
});
const technologies = keyMirror({
  html5: null,
  flash: null,
});

module.exports = {
  freeSpinsStatuses,
  platforms,
  statuses,
  technologies,
};
