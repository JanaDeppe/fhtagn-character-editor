import blobStream from 'blob-stream';
// v13
import store from '@/store';

import liberationSansNarrow from '@/assets/LiberationSansNarrow-Regular.ttf';
import liberationSansNarrowBold from '@/assets/LiberationSansNarrow-Bold.ttf';
import TextInPdfService from './text-in-pdf-service';
import characterSheetData from './character-sheet-data.json';

class CharacterSheetService {
  constructor(character) {
    this.dummyCharacter = {
      skillMap: JSON.parse('[{"skillId":"1585063067925-6631","skillname":"Anthropologie"},{"skillname":"Archäologie"},{"skillId":"1585063089813-18486","skillname":"Artillerie"},{"skillname":"Athletik"},{"skillId":"1585063067926-35627","skillname":"Buchführung"},{"skillId":"1585063067913-31413","skillname":"Bürokratie"},{"skillname":"Erste Hilfe"},{"skillId":"1585063067915-24485","skillname":"Fahren"},{"skillname":"Forensik"},{"skillId":"1585063067917-37732","skillname":"Fremdsprache"},{"skillId":"1585063067927-43991","skillname":"Fremdsprache"},{"skillId":"1585063067927-27240","skillname":"Geschichte"},{"skillname":"Handwerk"},{"skillId":"1585063067928-37499","skillname":"Heimlichkeit"},{"skillname":"Informatik"},{"skillId":"1585063067929-13243","skillname":"Kriminologie"},{"skillname":"Kunst"},{"skillname":"Mathematik"},{"skillId":"1585063113680-49809","skillname":"Medizin"},{"skillId":"1585063067931-9342","skillname":"Militärwissenschaft"},{"skillname":"Nahkampfwaffen"},{"skillId":"1585063100083-9706","skillname":"Naturwissenschaft"},{"skillId":"1585063067918-7512","skillname":"Navigation"},{"skillname":"Okkultismus"},{"skillname":"Pharmazie"},{"skillId":"1585063067919-34127","skillname":"Psychologie"},{"skillname":"Psychotherapie"},{"skillId":"1585063067920-23889","skillname":"Rechtswesen"},{"skillname":"Reiten"},{"skillId":"1585063067932-25251","skillname":"Religion"},{"skillId":"1585063067933-32745","skillname":"Schusswaffen"},{"skillname":"Schwimmen"},{"skillname":"Sprengstoffe"},{"skillname":"Steuern"},{"skillId":"1585063067934-9559","skillname":"Suchen"},{"skillname":"Träumen"},{"skillname":"Traumlandwissen"},{"skillname":"Überlebenskunst"},{"skillId":"1585063067935-3377","skillname":"Überwachen"},{"skillId":"1585063067921-29834","skillname":"Überzeugen"},{"skillname":"Unnatürliches Wissen"},{"skillId":"1585063067922-12706","skillname":"Verkleiden"},{"skillId":"1585063067923-5570","skillname":"Wachsamkeit"},{"skillId":"1585063067924-36042","skillname":"Waffenloser Kampf"}]'),
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

  static getCalculatedSkillValue({
    baseValue, professionalValue, isProfessional, isSelected, bonusCount,
  }) {
    let value = baseValue;

    if (isProfessional || isSelected) {
      value = professionalValue;
    }

    for (let i = 0; i < bonusCount; i++) value += 20;

    return value;
  }

  addSkills() {
    const linesPerColumn = 16;

    let currentLine = 0;
    let currentColumn = 0;
    let prevSkill;
    let nextSkill;

    this.pdfDocument.switchToPage(0);

    this.character.skillMap.forEach((skillData, index) => {
      const skill = skillData.skillId ? store.getters.skillById(skillData.skillId) : store.getters.skillByName(skillData.skillname);
      prevSkill = this.character.skillMap[index - 1] || { skillname: '' };
      nextSkill = this.character.skillMap[index + 1] || { skillname: '' };

      if (skill.hasSpecialisation) {
        const isFirstOfKind = prevSkill.skillname !== skillData.skillname;
        const isLastOfKind = nextSkill.skillname !== skillData.skillname;

        let emptyLinesCount = 1;
        if (isFirstOfKind) {
          emptyLinesCount = 2;
        } else if (isLastOfKind) {
          emptyLinesCount = 0;
        }
        if (skill.skillname === 'Steuern') emptyLinesCount = isFirstOfKind ? 1 : 0;

        // 1st specialisation
        if (isFirstOfKind) {
          this.text.printSkillNameAndBaseValue(skill, currentColumn, currentLine);
          currentLine += 1;
        }

        // Print specialisation name if defined
        if ((isFirstOfKind || isLastOfKind) && skill.specialisationName) {
          this.text.printSquare(currentColumn, currentLine);
          this.text.printSpecialisationName(skill, currentColumn, currentLine);
          this.text.printModifiedSkillValue(
            CharacterSheetService.getCalculatedSkillValue(skill),
            currentColumn,
            currentLine,
          );

          currentLine += 1;
          emptyLinesCount -= 1;
        }

        // Add empty specialisation lines
        if (skill.skillname !== nextSkill.skillname) {
          for (let i = 0; i < emptyLinesCount; i += 1) {
            this.text.printSquare(currentColumn, currentLine);

            currentLine += 1;
          }
        }
      } else if (skill.isProfessional || skill.isSelected || skill.bonusCount) {
      // Modified, regular skills
        this.text.printSquare(currentColumn, currentLine);
        this.text.printSkillNameAndBaseValue(skill, currentColumn, currentLine);
        this.text.printModifiedSkillValue(
          CharacterSheetService.getCalculatedSkillValue(skill),
          currentColumn,
          currentLine,
        );

        currentLine += 1;

      // Unmodified, regular skills
      } else {
        if (skill.skillname !== 'Unnatürliches Wissen') this.text.printSquare(currentColumn, currentLine);
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
      if (isArray) iterableObject = iterableObject.filter((item) => item.trim() !== '');

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
