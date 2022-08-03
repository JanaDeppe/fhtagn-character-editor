class TextInPdfService {
  constructor(doc) {
    this.doc = doc;

    this.defaultLineIndent = 28;
    this.labelFontColor = "black";
    this.labelFont = "Liberation Sans Narrow";
    this.headlineFont = "Liberation Sans Narrow Bold";
    this.valueFont = "Courier";
    this.customDataFontColor = "#696969";

    this.skillsSettings = {
      tableIndex: 2,
      fontSize: 10,
      color: this.labelFontColor,
      colorValues: this.customDataFontColor,
      columnWidth: 137,
      indentWithSquare: 43,
      uppermostLine: 19,
      fontSizeSquare: 16,
      lineOffsetSquare: 0.2,
    };

    this.skillColumnWidth = 137;
  }

  printText({ text, x, line, tableIndex, settings, font, fontSize, color }) {
    this.doc
      .font(font)
      .fontSize(fontSize)
      .fillColor(color)
      .text(
        text,
        x,
        TextInPdfService.convertLineToPixel(line, tableIndex),
        settings || {}
      );
  }

  printTextList({ list, fontSize, font, color }) {
    list.forEach((headers, page) => {
      this.doc.switchToPage(page);

      headers.forEach((header) => {
        this.printText({
          text: header.text,
          x: header.x,
          line: header.line,
          tableIndex: header.tableIndex,
          settings: header.settings,
          font,
          fontSize,
          color,
        });
      });
    });
  }

  printSkillNameAndBaseValue(
    { skillname, baseValue, hasSpecialisation },
    currentColumn,
    currentLine
  ) {
    const {
      tableIndex,
      fontSize,
      color,
      columnWidth,
      uppermostLine,
      indentWithSquare,
    } = this.skillsSettings;

    const hasBaseValue =
      skillname !== "Traumlandwissen" && skillname !== "Unnatürliches Wissen";

    this.printText({
      text: hasBaseValue ? `${skillname} (${baseValue}%)` : `${skillname}`,
      x:
        (hasSpecialisation ? this.defaultLineIndent : indentWithSquare) +
        currentColumn * columnWidth,
      line: uppermostLine + currentLine,
      tableIndex,
      settings: { width: 95 },
      font: this.labelFont,
      fontSize,
      color,
    });
  }

  printSpecialisationName({ specialisationName }, currentColumn, currentLine) {
    const {
      tableIndex,
      fontSize,
      color,
      columnWidth,
      uppermostLine,
      indentWithSquare,
    } = this.skillsSettings;

    this.printText({
      text: `${specialisationName}`,
      x: indentWithSquare + currentColumn * columnWidth,
      line: uppermostLine + currentLine,
      tableIndex,
      settings: { width: 95 },
      font: this.labelFont,
      fontSize,
      color,
    });
  }

  printSquare(currentColumn, currentLine) {
    const {
      tableIndex,
      fontSizeSquare,
      color,
      columnWidth,
      uppermostLine,
      lineOffsetSquare,
    } = this.skillsSettings;

    this.printText({
      text: "□",
      x: this.defaultLineIndent + currentColumn * columnWidth,
      line: uppermostLine + currentLine - lineOffsetSquare,
      tableIndex,
      font: this.labelFont,
      fontSize: fontSizeSquare,
      color,
    });
  }

  printModifiedSkillValue(value, currentColumn, currentLine) {
    const { tableIndex, fontSize, colorValues, columnWidth, uppermostLine } =
      this.skillsSettings;

    this.printText({
      text: `${value}%`,
      x: currentColumn * columnWidth,
      line: uppermostLine + currentLine + 0.15,
      tableIndex,
      settings: { align: "right", width: columnWidth + 20 },
      font: this.valueFont,
      fontSize,
      color: colorValues,
    });
  }

  static convertLineToPixel(line, tableIndex) {
    const topMargin = 44;
    const lineHeight = 20;
    const tableTopMargin = 3;

    return topMargin + line * lineHeight + tableTopMargin * tableIndex;
  }
}

export default TextInPdfService;
