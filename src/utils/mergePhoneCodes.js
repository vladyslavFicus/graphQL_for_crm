module.exports = (current, phone) => {
  if (/:/.test(phone)) {
    return [
      ...current,
      ...phone
        .split(':')
        .map(i => i.trim())
        .filter(i => i),
    ];
  }

  return [...current, phone];
};
