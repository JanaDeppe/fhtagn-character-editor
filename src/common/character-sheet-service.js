import blobStream from 'blob-stream';

import liberationSansNarrow from '@/assets/LiberationSansNarrow-Regular.ttf';
import liberationSansNarrowBold from '@/assets/LiberationSansNarrow-Bold.ttf';
import TextInPdfService from './text-in-pdf-service';
import PrintSkillsService from './print-skills-service';
import PrintCharacterDataService from './print-character-data-service';

// v13 of character sheet
import characterSheetData from './character-sheet-data.json';

class CharacterSheetService {
  constructor(character) {
    this.character = character;
    this.pageBackgrounds = characterSheetData.pageBackgrounds;
    this.labels = characterSheetData.labels;
    this.characterDataSettings = characterSheetData.characterDataSettings;

    // eslint-disable-next-line no-undef
    this.pdfDocument = new PDFDocument({
      size: 'A4',
      bufferPages: true,
    });

    this.stream = this.pdfDocument.pipe(blobStream());
    this.text = new TextInPdfService(this.pdfDocument);

    this.printCharacterData = new PrintCharacterDataService({
      doc: this.pdfDocument,
      text: this.text,
      character: this.character,
    });

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
    this.printCharacterData.addCharacterData();
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
}

export default CharacterSheetService;
