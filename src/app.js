const db = require('./db.js');
const output = require('./output.js');

db.initDbs('./data/Songs.db', './data/SongWords.db');

let songs = db.getSongsFromDb();
db.addSongWordsFromDb(songs);

//console.log(JSON.parse(JSON.stringify(songs[1].slides[0].getSlidePlainText())));
console.log(JSON.parse(JSON.stringify(songs[0])));

//output.writeSongsToDisk('./songs_output/', songs.splice(1, 1));
output.writeSongsToDisk('./songs_output/', songs);