
module.exports = class Song {
  constructor(songRow) {
    this.id = songRow.rowid;
    this.title = songRow.title;
    this.author = songRow.author;
    this.copyright = songRow.copyright;
    this.slides = [];
  }

  addSlides(slides) {
    this.slides.push(...slides);
  }

  getSongPlainText() {
    return this.slides
      .map((slide) => slide.getSlidePlainText())
      .join('\n\n');
  }
}