class TextInPdfService {
  constructor(doc) {
    this.doc = doc;

    this.defaultLineIndent = 28;
    this.labelFontColor = 'black';
    this.labelFont = 'Liberation Sans Narrow';
    this.headlineFont = 'Liberation Sans Narrow Bold';
    this.valueFont = 'Courier';
    this.customDataFontColor = '#696969';

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

  printTextList({
    list, fontSize, font, color,
  }) {
    this.doc.font(font);

    list.forEach((headers, page) => {
      this.doc.switchToPage(page);
      headers.forEach((header) => {
        this.doc
          .fontSize(fontSize)
          .fillColor(color)
          .text(
            header.text,
            header.x,
            TextInPdfService.convertLineToPixel(header.line, header.tableIndex),
            header.settings ? header.settings : {},
          );
      });
    });
  }

  printSkillNameAndBaseValue({ skillname, baseValue, hasSpecialisation }, currentColumn, currentLine) {
    const {
      tableIndex,
      fontSize,
      color,
      columnWidth,
      uppermostLine,
      indentWithSquare,
    } = this.skillsSettings;

    const hasBaseValue = skillname !== 'Traumlandwissen' && skillname !== 'Unnatürliches Wissen';

    this.doc.font(this.labelFont)
      .fontSize(fontSize)
      .fillColor(color)
      .text(
        hasBaseValue ? `${skillname} (${baseValue}%)` : `${skillname}`,
        (hasSpecialisation ? this.defaultLineIndent : indentWithSquare) + currentColumn * columnWidth,
        TextInPdfService.convertLineToPixel(uppermostLine + currentLine, tableIndex),
        { width: 95 },
      );
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

    this.doc.font(this.labelFont)
      .fontSize(fontSize)
      .fillColor(color)
      .text(
        `${specialisationName}`,
        indentWithSquare + currentColumn * columnWidth,
        TextInPdfService.convertLineToPixel(uppermostLine + currentLine, tableIndex),
        { width: 95 },
      );
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

    this.doc.font(this.labelFont)
      .fontSize(fontSizeSquare)
      .fillColor(color)
      .text(
        '□',
        this.defaultLineIndent + currentColumn * columnWidth,
        TextInPdfService.convertLineToPixel(uppermostLine + currentLine - lineOffsetSquare, tableIndex),
        {},
      );
  }

  printModifiedSkillValue(value, currentColumn, currentLine) {
    const {
      tableIndex,
      fontSize,
      colorValues,
      columnWidth,
      uppermostLine,
    } = this.skillsSettings;

    this.doc.font(this.valueFont)
      .fontSize(fontSize)
      .fillColor(colorValues)
      .text(
        `${value}%`,
        currentColumn * columnWidth,
        TextInPdfService.convertLineToPixel(uppermostLine + currentLine + 0.15, tableIndex),
        { align: 'right', width: columnWidth + 20 },
      );
  }

  static convertLineToPixel(line, tableIndex) {
    const topMargin = 44;
    const lineHeight = 20;
    const tableTopMargin = 3;

    return topMargin + (line * lineHeight) + (tableTopMargin * tableIndex);
  }
}

export default TextInPdfService;
