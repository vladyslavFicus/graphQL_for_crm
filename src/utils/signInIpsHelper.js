module.exports = ({ signInIps }) => {
  return signInIps
    ? Object.values(signInIps)
        .sort((a, b) => {
          if (a.sessionStart > b.sessionStart) {
            return -1;
          } else if (b.sessionStart > a.sessionStart) {
            return 1;
          }

          return 0;
        })
        .slice(0, 10)
    : [];
};
