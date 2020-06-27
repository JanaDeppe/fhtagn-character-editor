import TextInPdfService from './text-in-pdf-service';
import characterSheetData from './character-sheet-data.json';

class PrintCharacterDataService {
  constructor({ doc, text, character }) {
    this.doc = doc;
    this.text = text;
    this.character = character;

    this.text = new TextInPdfService(this.doc);

    this.characterDataSettings = characterSheetData.characterDataSettings;
    this.characterDataMap = {
      attributeValues: this.character.characterData.attributeValues,
      name: {
        name: `${this.character.characterData.personalInformation.Vorname} ${this.character.characterData.personalInformation.Nachname}`,
      },
      facettes: {
        facettes: this.character.characterData.facettes,
      },
      personalInformation: this.character.characterData.personalInformation,
      personalInformationPageTwo: this.character.characterData.personalInformation,
      connections: this.character.characterData.connections,
      motivations: this.character.characterData.motivations,
      derivedValues: this.character.derivedValues,
      facetteDetails: this.character.facettes,
    };
  }

  addCharacterData() {
    this.addRegularTypes();
    this.addSpecialTypes();
  }


  addRegularTypes() {
    const { doc } = this;

    Object.keys(this.characterDataSettings.types).forEach(typeKey => {
      const { items, typeSettings } = this.characterDataSettings.types[typeKey];
      const values = this.characterDataMap[typeKey];
      const isArray = Array.isArray(values);
      let iterableObject = isArray ? values : Object.keys(items);

      // Remove empty strings from Arrays:
      if (isArray) iterableObject = iterableObject.filter(item => item.trim() !== '');

      doc.switchToPage(typeSettings.page);

      this.printRegularTypeSet({
        typeKey, iterableObject, values, items, isArray, typeSettings,
      });

      // Print attributes x5
      if (typeKey === 'attributeValues') {
        this.printAttributesx5({ items, values, typeSettings });
      }
    });
  }

  printRegularTypeSet({
    typeKey, iterableObject, isArray, values, items, typeSettings,
  }) {
    const {
      font, fontSize, color, lineAdjustment,
    } = typeSettings;

    iterableObject.forEach((key, index) => {
      const itemSettings = isArray ? items[typeKey] : items[key];
      const line = isArray ? itemSettings.line + index : itemSettings.line;
      const text = isArray ? key : values[key];

      this.text.printText({
        text,
        x: itemSettings.x,
        line: line + lineAdjustment,
        tableIndex: itemSettings.table,
        settings: itemSettings.settings,
        font,
        fontSize,
        color,
      });
    });
  }

  printAttributesx5({ items, values, typeSettings }) {
    const {
      font, fontSize, color, lineAdjustment, distanceToTimesFive,
    } = typeSettings;

    Object.keys(items).forEach(key => {
      this.text.printText({
        text: parseInt(values[key], 10) * 5,
        x: items[key].x + distanceToTimesFive,
        line: items[key].line + lineAdjustment,
        tableIndex: items[key].tableIndex,
        settings: items[key].settings,
        font,
        fontSize,
        color,
      });
    });
  }

  addSpecialTypes() {
    Object.keys(this.characterDataSettings.special).forEach(typeKey => {
      if (typeKey === 'professionName') this.addProfessionName();
      if (typeKey === 'facetteDetails') this.addFacetteDetails();
    });
  }

  addProfessionName() {
    const { doc } = this;
    const professionName = this.character.characterData.professionVariant
      ? `${this.character.characterData.professionVariant} (${this.character.professionName})`
      : this.character.professionName;

    const length = professionName.length >= 30 ? 'Long' : 'Short';
    const typeSettings = this.characterDataSettings.special.professionName[`typeSettings${length}`];
    const itemSettings = this.characterDataSettings.special.professionName.items[`professionName${length}`];
    const {
      fontSize, font, color, lineAdjustment, page,
    } = typeSettings;

    doc.switchToPage(page);

    this.text.printText({
      text: professionName,
      x: itemSettings.x,
      line: itemSettings.line + lineAdjustment,
      tableIndex: itemSettings.tableIndex,
      settings: itemSettings.settings,
      font,
      fontSize,
      color,
    });
  }

  addFacetteDetails() {
    // const { doc } = this;
    const { doc } = this;
    const { facettes: facetteDetails } = this.character;
    const {
      page, fontSize, font, color, lineAdjustment,
    } = this.characterDataSettings.special.facetteDetails.typeSettings;
    const {
      x, line, tableIndex, settings,
    } = this.characterDataSettings.special.facetteDetails.items.facetteDetails;
    const text = `
    ${facetteDetails.map(facette => {
    const name = Object.keys(facette)[0];
    const { advantage, disadvantage } = facette[name];
    return `
${name}
Vorteil: ${advantage}
Nachteil: ${disadvantage}
    `;
  }).join('')}
    `;

    doc.switchToPage(page);

    this.text.printText({
      text,
      x,
      line: line + lineAdjustment,
      tableIndex,
      settings,
      font,
      fontSize,
      color,
    });

    console.log(facetteDetails);
  }
}

export default PrintCharacterDataService;
