
module.exports = class Slide {
  constructor(title, rows) {
    this.title = title;
    this.rows = rows || [];
  }

  hasRows() {
    return !!this.rows.length;
  }

  getSlidePlainText() {
    let output = [];
    if (this.title) {
      output.push(`[${this.title}]`);
    }
    output.push(...this.rows);

    return output.join('\n');
  }
}