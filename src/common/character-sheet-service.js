import blobStream from 'blob-stream';

import liberationSansNarrow from '@/assets/LiberationSansNarrow-Regular.ttf';
import liberationSansNarrowBold from '@/assets/LiberationSansNarrow-Bold.ttf';
import TextInPdfService from './text-in-pdf-service';
import PrintSkillsService from './print-skills-service';

// v13 of character sheet
import characterSheetData from './character-sheet-data.json';

class CharacterSheetService {
  constructor(character) {
    this.character = character;
    this.pageBackgrounds = characterSheetData.pageBackgrounds;
    this.labels = characterSheetData.labels;
    this.characterDataSettings = characterSheetData.characterDataSettings;

    this.characterSettingsDataMap = {
      attributeValues: this.character.characterData.attributeValues,
      professionName: {
        professionName: this.character.characterData.professionVariant
          ? `${this.character.characterData.professionVariant} (${this.character.professionName})`
          : this.character.professionName,
      },
      name: {
        name: `${this.character.characterData.personalInformation.Vorname} ${this.character.characterData.personalInformation.Nachname}`,
      },
      personalInformation: this.character.characterData.personalInformation,
      facettes: {
        facettes: this.character.characterData.facettes.join(', '),
      },
      connections: this.character.characterData.connections,
      motivations: this.character.characterData.motivations,
      derivedValues: this.character.derivedValues,
    };

    // eslint-disable-next-line no-undef
    this.pdfDocument = new PDFDocument({
      size: 'A4',
      bufferPages: true,
    });

    this.stream = this.pdfDocument.pipe(blobStream());
    this.text = new TextInPdfService(this.pdfDocument);
    this.skills = new PrintSkillsService({
      doc: this.pdfDocument,
      text: this.text,
      skillMap: this.character.skillMap,
    });
    this.fontCollection = {};
  }

  async init() {
    await Promise.all([
      this.getFont(
        'Liberation Sans Narrow Bold',
        liberationSansNarrowBold,
      ),
      this.getFont(
        'Liberation Sans Narrow',
        liberationSansNarrow,
      ),
    ]);
  }

  getFont(name, src) {
    const xhr = new XMLHttpRequest();
    const self = this;
    xhr.open('GET', src, true);
    xhr.responseType = 'arraybuffer';

    return new Promise((resolve, reject) => {
      xhr.onload = () => {
        const arrayBuffer = xhr.response;

        if (arrayBuffer) {
          self.fontCollection[name] = new Uint8Array(arrayBuffer);
          self.pdfDocument.registerFont(name, self.fontCollection[name]);
          resolve();
        } else {
          // eslint-disable-next-line no-console
          console.log(`Error downloading font resource from ${src}`);
          reject();
        }
      };

      xhr.send(null);
    });
  }

  generateDocumentURL() {
    return new Promise(resolve => {
      this.fillPDFDocument();
      this.stream.on('finish', () => {
        resolve(this.stream.toBlobURL('application/pdf'));
      });
    });
  }

  fillPDFDocument() {
    this.addImages();
    this.addLabels();
    this.addCharacterData();
    this.skills.printSkills();

    this.pdfDocument.end();
  }

  addImages() {
    this.pageBackgrounds.forEach((dataURL, index) => {
      if (index !== 0) this.pdfDocument.addPage();
      this.pdfDocument.image(dataURL, 22, 20, { width: 550 });
    });
  }

  addLabels() {
    Object.keys(this.labels).forEach(listName => {
      const { fontSize, color, font } = this.labels[listName].settings;
      this.text.printTextList({
        list: this.labels[listName].texts,
        fontSize,
        font,
        color,
      });
    });
  }

  addCharacterData() {
    const doc = this.pdfDocument;

    Object.keys(this.characterDataSettings.types).forEach(typeKey => {
      const values = this.characterSettingsDataMap[typeKey];
      const { items, typeSettings } = this.characterDataSettings.types[typeKey];
      const {
        fontSize, font, color, lineAdjustment,
      } = typeSettings;

      doc.font(font);
      doc.switchToPage(typeSettings.page);

      const isArray = Array.isArray(values);
      let iterableObject = isArray ? values : Object.keys(items);

      // Remove empty strings from Arrays:
      if (isArray) iterableObject = iterableObject.filter(item => item.trim() !== '');

      iterableObject.forEach((key, index) => {
        const itemSettings = isArray ? items[typeKey] : items[key];
        const line = isArray ? itemSettings.line + index : itemSettings.line;
        const text = isArray ? key : values[key];

        doc
          .fontSize(fontSize)
          .fillColor(color)
          .text(
            text,
            itemSettings.x,
            TextInPdfService.convertLineToPixel(line + lineAdjustment, itemSettings.tableIndex),
            itemSettings.settings ? itemSettings.settings : {},
          );
      });

      // Special cases
      if (typeKey === 'attributeValues') {
        Object.keys(items).forEach(key => {
          doc
            .fontSize(fontSize)
            .fillColor(color)
            .text(
              parseInt(values[key], 10) * 5,
              items[key].x + typeSettings.distanceToTimesFive,
              TextInPdfService.convertLineToPixel(items[key].line + lineAdjustment, items[key].tableIndex),
              items[key].settings ? items[key].settings : {},
            );
        });
      }
    });
  }
}

export default CharacterSheetService;
