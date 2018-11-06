module.exports = (entities, notes) => {
  if (!notes || notes.length === 0) {
    return entities;
  }

  return entities.map(t => ({
    ...t,
    note: notes.find(n => n.targetUUID === t.uuid) || null,
  }));
};
