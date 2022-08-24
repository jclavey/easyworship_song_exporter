const fsExtra = require('fs-extra');

module.exports.writeSongsToDisk = (directory, songs) => {
  emptyOutputDirectory(directory);
  songs.forEach(song => {
    writeSongToDisk(directory, song);
  });
};

const getSongFilename = (song) => {
  return song.title
    //.replace(/\s/g, '_')
    .replace(/[^a-z0-9_ ]/gi, '') + ".txt";
};

const writeSongToDisk = (directory, song) => {
  fsExtra.writeFileSync(
    directory + getSongFilename(song),
    song.getSongPlainText() 
  );
};

const emptyOutputDirectory = (directory) => {
  console.log(`Clearing output directory [${directory}]...`);
  fsExtra.emptyDirSync(directory);
};