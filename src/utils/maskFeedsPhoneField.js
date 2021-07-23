const maskText = require('./maskText');

/**
 * Mask clients phone in details under the ***
 *
 * @param feed object
 *
 * @return {object}
 */

const PLAYER_PROFILE_REGISTERED = 'PLAYER_PROFILE_REGISTERED';
const PLAYER_PROFILE_CHANGED = 'PLAYER_PROFILE_CHANGED';

const parseDetails = (feed) => {
  const details = JSON.parse(feed.details);
  const { contacts } = details;

  return { details, contacts };
};

module.exports = (feed) => {
  if (feed.type === PLAYER_PROFILE_REGISTERED) {
    const { details, contacts } = parseDetails(feed);

    if (!contacts) {
      return feed;
    }

    return {
      ...feed,
      details: JSON.stringify({
        ...details,
        contacts: {
          ...contacts,
          phone: contacts.phone ? maskText(contacts.phone, true) : undefined,
          additionalPhone: contacts.additionalPhone ? maskText(contacts.additionalPhone, true) : undefined },
      }),
    };
  } if (feed.type === PLAYER_PROFILE_CHANGED) {
    const { details, contacts } = parseDetails(feed);

    if (!contacts) {
      return feed;
    }

    return {
      ...feed,
      details: JSON.stringify({
        ...details,
        contacts: {
          ...contacts,
          phone: contacts.phone ? {
            ...contacts.phone,
            from: maskText(contacts.phone.from, true),
            to: maskText(contacts.phone.to, true) } : undefined,
          additionalPhone: contacts.additionalPhone ? {
            ...contacts.additionalPhone,
            from: maskText(contacts.additionalPhone.from, true),
            to: maskText(contacts.additionalPhone.to, true),
          } : undefined },
      }),
    };
  }

  return feed;
};
