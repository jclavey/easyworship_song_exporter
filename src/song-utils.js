const Slide = require("./classes/slide");

const SLIDE_TITLE_REGEX = /^(Verse ?[0-9]*)|(Chorus)|(Tag)|(Bridge)$/;

module.exports.parseSongSlides = (songWordsRaw) => {
  let lines = _prepareSongLines(songWordsRaw);
  let slides = _parseLinesToSlides(lines);

  return slides;
};

const _parseLinesToSlides = (lines) => {
  let slides = [];
  let currentSlide = new Slide();

  lines.forEach(line => {
    if (!line) {
      if (currentSlide.hasRows()) {
        slides.push(currentSlide);
        currentSlide = new Slide();
      }
    } else {
      if (line.match(SLIDE_TITLE_REGEX)) {
        currentSlide.title = line;
      } else {
        currentSlide.rows.push(line);
      }
    }
  });

  if (currentSlide.hasRows) {
    slides.push(currentSlide);
  }

  return slides;
}

const _prepareSongLines = (songWordsRaw) => {
  let preparedSongWords = _stripRtfFormatting(songWordsRaw);
  preparedSongWords = _removeDuplicateNewLines(preparedSongWords);
  preparedSongWords = _removeDuplicateNewLines(preparedSongWords);
  let lines = _splitLines(preparedSongWords);
  lines = _removePageNumberLines(lines);

  return lines || [];
}

const _stripRtfFormatting = (songWords) => {
  return songWords
    .replace(/\\u8217\?/g, '\'')
    .replace(/\\u8216\?/g, '\'')
    .replace(/\\u232\?/g, 'e')
    .replace(/\\u82[0-9]{2}\?/g, '')
    .replace(/\\\w+|\{.*?\}|}/g, "")
    .replace(/{|}/g, "");
}

const _removeDuplicateNewLines = (songWords) => {
  return songWords
    .replace(/\r/g,'')
    .replace(/\n\n+/g, "\n\n");
}

const _splitLines = (songWords) => {
  let lines = songWords.split('\n');
  return lines.map(l => l.trim());
}

const _removePageNumberLines = (lines) => {
  return lines.filter(l => !l.match(/^[0-9[+\/[0-9]+$/));
}