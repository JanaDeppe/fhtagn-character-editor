import blobStream from 'blob-stream';
// v13
import characterSheetData from './character-sheet-data.json';
import TextInPdfService from './text-in-pdf-service';
import store from '@/store';

import liberationSansNarrow from '@/assets/LiberationSansNarrow-Regular.ttf';
import liberationSansNarrowBold from '@/assets/LiberationSansNarrow-Bold.ttf';

class CharacterSheetService {
  constructor(character) {
    this.dummyCharacter = {
      reducedSkills: [{
        skill: 'Anthropologie', hasSpecialisation: false, baseValue: 0, name: undefined, value: undefined, index: 0, isBonus: false,
      }, {
        skill: 'Archäologie', hasSpecialisation: false, baseValue: 0, name: undefined, value: undefined, index: 0, isBonus: true,
      }, {
        skill: 'Artillerie', hasSpecialisation: false, baseValue: 0, name: undefined, value: undefined, index: 0, isBonus: false,
      }, {
        skill: 'Athletik', hasSpecialisation: false, baseValue: 30, name: undefined, value: undefined, index: 0, isBonus: false,
      }, {
        skill: 'Buchführung', hasSpecialisation: false, baseValue: 10, name: undefined, value: 50, index: 0, isBonus: false,
      }, {
        skill: 'Bürokratie', hasSpecialisation: false, baseValue: 10, name: undefined, value: 40, index: 0, isBonus: false,
      }, {
        skill: 'Erste Hilfe', hasSpecialisation: false, baseValue: 10, name: undefined, value: 30, index: 0, isBonus: false,
      }, {
        skill: 'Fahren', hasSpecialisation: false, baseValue: 20, name: undefined, value: 40, index: 0, isBonus: false,
      }, {
        skill: 'Forensik', hasSpecialisation: false, baseValue: 0, name: undefined, value: 40, index: 0, isBonus: false,
      }, {
        skill: 'Fremdsprache', hasSpecialisation: true, baseValue: 0, name: 'Latein', value: undefined, index: 0, isBonus: true,
      }, {
        skill: 'Geschichte', hasSpecialisation: false, baseValue: 0, name: undefined, value: undefined, index: 0, isBonus: false,
      }, {
        skill: 'Handwerk', hasSpecialisation: true, baseValue: 0, name: undefined, value: undefined, index: 0, isBonus: false,
      }, {
        skill: 'Heimlichkeit', hasSpecialisation: false, baseValue: 10, name: undefined, value: 50, index: 0, isBonus: false,
      }, {
        skill: 'Informatik', hasSpecialisation: false, baseValue: 0, name: undefined, value: 40, index: 0, isBonus: false,
      }, {
        skill: 'Kriminologie', hasSpecialisation: false, baseValue: 10, name: undefined, value: 40, index: 0, isBonus: false,
      }, {
        skill: 'Kunst', hasSpecialisation: true, baseValue: 0, name: 'Malerei', value: undefined, index: 0, isBonus: true,
      }, {
        skill: 'Kunst', hasSpecialisation: true, baseValue: 0, name: 'Bildhauerei', value: undefined, index: 1, isBonus: true,
      }, {
        skill: 'Mathematik', hasSpecialisation: false, baseValue: 0, name: undefined, value: undefined, index: 0, isBonus: false,
      }, {
        skill: 'Medizin', hasSpecialisation: false, baseValue: 0, name: undefined, value: undefined, index: 0, isBonus: false,
      }, {
        skill: 'Militärwissenschaft', hasSpecialisation: false, baseValue: 0, name: undefined, value: 40, index: 0, isBonus: false,
      }, {
        skill: 'Nahkampfwaffen', hasSpecialisation: false, baseValue: 30, name: undefined, value: undefined, index: 0, isBonus: false,
      }, {
        skill: 'Naturwissenschaft', hasSpecialisation: true, baseValue: 0, name: undefined, value: undefined, index: 0, isBonus: false,
      }, {
        skill: 'Navigation', hasSpecialisation: false, baseValue: 10, name: undefined, value: 30, index: 0, isBonus: false,
      }, {
        skill: 'Okkultismus', hasSpecialisation: false, baseValue: 10, name: undefined, value: undefined, index: 0, isBonus: false,
      }, {
        skill: 'Pharmazie', hasSpecialisation: false, baseValue: 0, name: undefined, value: 40, index: 0, isBonus: false,
      }, {
        skill: 'Psychologie', hasSpecialisation: false, baseValue: 10, name: undefined, value: 50, index: 0, isBonus: false,
      }, {
        skill: 'Psychotherapie', hasSpecialisation: false, baseValue: 10, name: undefined, value: undefined, index: 0, isBonus: false,
      }, {
        skill: 'Rechtswesen', hasSpecialisation: false, baseValue: 0, name: undefined, value: 30, index: 0, isBonus: false,
      }, {
        skill: 'Reiten', hasSpecialisation: false, baseValue: 10, name: undefined, value: 50, index: 0, isBonus: false,
      }, {
        skill: 'Religion', hasSpecialisation: false, baseValue: 10, name: undefined, value: undefined, index: 0, isBonus: false,
      }, {
        skill: 'Schusswaffen', hasSpecialisation: false, baseValue: 20, name: undefined, value: 50, index: 0, isBonus: false,
      }, {
        skill: 'Schwimmen', hasSpecialisation: false, baseValue: 20, name: undefined, value: 60, index: 0, isBonus: false,
      }, {
        skill: 'Sprengstoffe', hasSpecialisation: false, baseValue: 0, name: undefined, value: 40, index: 0, isBonus: false,
      }, {
        skill: 'Steuern', hasSpecialisation: true, baseValue: 0, name: 'Seefahrt', value: 40, index: 0, isBonus: false,
      }, {
        skill: 'Suchen', hasSpecialisation: false, baseValue: 20, name: undefined, value: 50, index: 0, isBonus: false,
      }, {
        skill: 'Träumen', hasSpecialisation: false, baseValue: 'EN', name: undefined, value: undefined, index: 0, isBonus: false,
      }, {
        skill: 'Traumlandwissen', hasSpecialisation: false, baseValue: 'Unnatürliches Wissen', name: undefined, value: undefined, index: 0, isBonus: false,
      }, {
        skill: 'Überlebenskunst', hasSpecialisation: false, baseValue: 10, name: undefined, value: 40, index: 0, isBonus: false,
      }, {
        skill: 'Überwachen', hasSpecialisation: false, baseValue: 0, name: undefined, value: 40, index: 0, isBonus: false,
      }, {
        skill: 'Überzeugen', hasSpecialisation: false, baseValue: 20, name: undefined, value: 50, index: 0, isBonus: false,
      }, {
        skill: 'Unnatürliches Wissen', hasSpecialisation: false, baseValue: 0, name: undefined, value: undefined, index: 0, isBonus: false,
      }, {
        skill: 'Verkleiden', hasSpecialisation: false, baseValue: 10, name: undefined, value: 40, index: 0, isBonus: false,
      }, {
        skill: 'Wachsamkeit', hasSpecialisation: false, baseValue: 20, name: undefined, value: 50, index: 0, isBonus: false,
      }, {
        skill: 'Waffenloser Kampf', hasSpecialisation: false, baseValue: 40, name: undefined, value: 50, index: 0, isBonus: false,
      }],
      derivedValues: {
        breakingPoint: 72,
        hitpoints: 11,
        stabilityPoints: 90,
        willpowerPoints: 18,
      },
      characterData: {
        attributeValues: {
          ST: 13, KO: 13, GE: 18, IN: 3, EN: 8, CH: 3,
        },
        connections: ['Erste Verbindung', 'Zweite Verbindung', 'Und noch eine Verbindung'],
        derivedValues: {},
        facettes: ['Reichtum', 'Other stuff', 'More Facettes'],
        motivations: ['Erste Motivation', 'Zweite Motivation', 'Dritte Motivation', '', ''],
        personalInformation: {
          Vorname: 'Martha', Nachname: 'Musterfrau', Muttersprache: 'deutsch', Alter: '23', Aussehen: 'sexy Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est.',
        },
        profession: 1,
        professionVariant: 'Streifenpolizistin',
      },
      professionName: 'Gesetzeshüterin',
    };
    this.isDummyData = !(character.professionName);
    this.character = this.isDummyData ? this.dummyCharacter : character;

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
          console.log(`Error downloading font resource from ${src}`);
          reject();
        }
      };

      xhr.send(null);
    });
  }

  generateDocumentURL() {
    return new Promise((resolve) => {
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
    this.addSkills();

    this.pdfDocument.end();
  }

  addImages() {
    this.pageBackgrounds.forEach((dataURL, index) => {
      if (index !== 0) this.pdfDocument.addPage();
      this.pdfDocument.image(dataURL, 22, 20, { width: 550 });
    });
  }

  addLabels() {
    Object.keys(this.labels).forEach((listName) => {
      const { fontSize, color, font } = this.labels[listName].settings;
      this.text.printTextList({
        list: this.labels[listName].texts,
        fontSize,
        font,
        color,
      });
    });
  }

  addSkills() {
    const linesPerColumn = 16;

    let currentLine = 0;
    let currentColumn = 0;
    let nextSkill = this.character.reducedSkills[1];

    this.pdfDocument.switchToPage(0);

    this.character.reducedSkills.forEach((skill, index) => {
      nextSkill = this.character.reducedSkills[index + 1] || { skill: '' };

      if (skill.hasSpecialisation) {
        let emptyLinesCount = skill.skill === 'Steuern' ? 1 - skill.index : 2 - skill.index;

        // 1st specialisation
        if (skill.index === 0) {
          this.text.printSkillNameAndBaseValue(skill, currentColumn, currentLine);
          currentLine += 1;

          // Print specialisation name if defined
          if (skill.name) {
            this.text.printSquare(currentColumn, currentLine);
            this.text.printSpecialisationName(skill, currentColumn, currentLine);
            this.text.printModifiedSkillValue(
              this.isDummyData ? skill.value : store.getters.getCalculatedSkillValueByName(skill.skill, skill.index),
              currentColumn,
              currentLine,
            );

            currentLine += 1;
            emptyLinesCount -= 1;
          }

        // 2nd specialisation
        } else if (skill.index === 1) {
          this.text.printSquare(currentColumn, currentLine);
          this.text.printSpecialisationName(skill, currentColumn, currentLine);

          currentLine += 1;
          emptyLinesCount -= 1;
        }

        // Add empty specialisation lines
        if (skill.skill !== nextSkill.skill) {
          for (let i = 0; i < emptyLinesCount; i += 1) {
            this.text.printSquare(currentColumn, currentLine);

            currentLine += 1;
          }
        }
      } else if (skill.value !== undefined || skill.isBonus) {
      // Modified, regular skills
        this.text.printSquare(currentColumn, currentLine);
        this.text.printSkillNameAndBaseValue(skill, currentColumn, currentLine);
        this.text.printModifiedSkillValue(
          this.isDummyData ? skill.value : store.getters.getCalculatedSkillValueByName(skill.skill, skill.index),
          currentColumn,
          currentLine,
        );

        currentLine += 1;

      // Unmodified, regular skills
      } else {
        if (skill.skill !== 'Unnatürliches Wissen') this.text.printSquare(currentColumn, currentLine);
        this.text.printSkillNameAndBaseValue(skill, currentColumn, currentLine);

        currentLine += 1;
      }

      if (currentLine >= linesPerColumn) {
        currentLine = 0;
        currentColumn += 1;
      }
    });
  }

  addCharacterData() {
    const doc = this.pdfDocument;

    Object.keys(this.characterDataSettings.types).forEach((typeKey) => {
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
            CharacterSheetService.convertLineToPixel(line + lineAdjustment, itemSettings.tableIndex),
            itemSettings.settings ? itemSettings.settings : {},
          );
      });

      // Special cases
      if (typeKey === 'attributeValues') {
        Object.keys(items).forEach((key) => {
          doc
            .fontSize(fontSize)
            .fillColor(color)
            .text(
              parseInt(values[key], 10) * 5,
              items[key].x + typeSettings.distanceToTimesFive,
              CharacterSheetService.convertLineToPixel(items[key].line + lineAdjustment, items[key].tableIndex),
              items[key].settings ? items[key].settings : {},
            );
        });
      }
    });
  }

  static convertLineToPixel(line, tableIndex) {
    const topMargin = 44;
    const lineHeight = 20;
    const tableTopMargin = 3;

    return topMargin + (line * lineHeight) + (tableTopMargin * tableIndex);
  }
}

export default CharacterSheetService;
