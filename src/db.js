const sqlite = require("better-sqlite3");
const Song = require("./classes/song");
const { parseSongSlides } = require("./song-utils");

let songDb;
let songWordsDb;

module.exports.initDbs = (songDbPath, songWordsDbPath) => {
  console.log(`Initialising DBs...`)
  songDb = new sqlite(songDbPath);
  songWordsDb = new sqlite(songWordsDbPath);
}

module.exports.getSongsFromDb = () => {
  console.log(`Reading songs from DB...`);
  let songRows = songDb.prepare("SELECT * FROM song").all();
  console.log(`Read [${songRows.length}] songs from DB`);

  return songRows.map(s => new Song(s));
}

module.exports.addSongWordsFromDb = (songs) => {
  let songsMap = {};
  songs.forEach(s => { songsMap[s.id] = s });

  console.log(`Reading song words from DB...`);
  let songWordRows = songWordsDb.prepare("SELECT * FROM word").all();

  songWordRows.forEach(sw => {
    let song = songsMap[sw.song_id];
    if (song) {
      song.addSlides(parseSongSlides(sw.words));
    }
  });
}