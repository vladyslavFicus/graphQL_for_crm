module.exports = fileStream =>
  new Promise(resolve => {
    const buffs = [];
    const readStream = fileStream.createReadStream();

    readStream.on('data', d => {
      buffs.push(d);
    });

    readStream.on('end', () => {
      resolve(Buffer.concat(buffs));
    });
  });
