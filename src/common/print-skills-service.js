import store from '@/store';

class PrintSkillsService {
  constructor({ doc, text, skillMap }) {
    this.doc = doc;
    this.text = text;
    this.skillMap = skillMap;

    this.settings = {
      linesPerColumn: 16,
    };
    this.overflowSpecialisations = [];

    // Init counting values
    this.currentLine = 0;
    this.currentColumn = 0;
    this.prevSkill = null;
    this.nextSkill = null;
    this.nthOfKind = 0;
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

  printRegularModifiedSkill({ skill }) {
    this.text.printSquare(this.currentColumn, this.currentLine);
    this.text.printSkillNameAndBaseValue(skill, this.currentColumn, this.currentLine);
    this.text.printModifiedSkillValue(
      PrintSkillsService.getCalculatedSkillValue(skill),
      this.currentColumn,
      this.currentLine,
    );
  }

  printRegularUnmodifiedSkill({ skill }) {
    if (skill.skillname !== 'Unnatürliches Wissen') this.text.printSquare(this.currentColumn, this.currentLine);
    this.text.printSkillNameAndBaseValue(skill, this.currentColumn, this.currentLine);
  }

  printSpecialisationName({ skill }) {
    this.text.printSquare(this.currentColumn, this.currentLine);
    this.text.printSpecialisationName(skill, this.currentColumn, this.currentLine);
    this.text.printModifiedSkillValue(
      PrintSkillsService.getCalculatedSkillValue(skill),
      this.currentColumn,
      this.currentLine,
    );
  }

  specialisedSkillTreatment({ skillData, skill }) {
    const isFirstOfKind = this.prevSkill.skillname !== skillData.skillname;
    const isLastOfKind = this.nextSkill.skillname !== skillData.skillname;

    // Determine how many skills of the same specialisation came before or after
    if (isFirstOfKind) this.nthOfKind = 0;
    else this.nthOfKind += 1;

    let emptyLinesCount = skill.skillname === 'Steuern'
      ? 1 - this.nthOfKind
      : 2 - this.nthOfKind;

    // 1st specialisation
    if (isFirstOfKind) {
      this.text.printSkillNameAndBaseValue(skill, this.currentColumn, this.currentLine);
      this.currentLine += 1;
    }

    // Print specialisation name if defined
    if (this.nthOfKind < 2 && skill.specialisationName) {
      this.printSpecialisationName({ skill });

      this.currentLine += 1;
      emptyLinesCount -= 1;
    }

    // Save overflow specialisations to a different array
    if (this.nthOfKind >= 2) this.overflowSpecialisations.push(skill);

    // Add empty specialisation lines
    if (isLastOfKind) {
      for (let i = 0; i < emptyLinesCount; i += 1) {
        this.text.printSquare(this.currentColumn, this.currentLine);
        this.currentLine += 1;
      }
    }
  }

  printSkill(skillData, index) {
    const skill = skillData.skillId ? store.getters.skillById(skillData.skillId) : store.getters.skillByName(skillData.skillname);
    this.prevSkill = this.skillMap[index - 1] || { skillname: '' };
    this.nextSkill = this.skillMap[index + 1] || { skillname: '' };

    // Specialisations
    if (skill.hasSpecialisation) {
      this.specialisedSkillTreatment({ skillData, skill });

    // Modified, regular skills
    } else if (skill.isProfessional || skill.isSelected || skill.bonusCount) {
      this.printRegularModifiedSkill({ skill });
      this.currentLine += 1;

    // Unmodified, regular skills
    } else {
      this.printRegularUnmodifiedSkill({ skill });
      this.currentLine += 1;
    }

    // Switch columns
    if (this.currentLine >= this.settings.linesPerColumn) {
      this.currentLine = 0;
      this.currentColumn += 1;
    }
  }

  printOverflowSpecialisations() {
    const { overflowSpecialisations: skills } = this;
    this.currentLine += 1;
    skills.forEach((skill, index) => {
      const prevSkill = skills[index - 1] || { skillname: '' };
      const isFirstOfKind = prevSkill.skillname !== skill.skillname;

      if (isFirstOfKind) {
        this.text.printSkillNameAndBaseValue(skill, this.currentColumn, this.currentLine);
        this.currentLine += 1;
      }

      if (skill.specialisationName) {
        this.printSpecialisationName({ skill });
        this.currentLine += 1;
      }
    });
  }

  printSkills() {
    this.doc.switchToPage(0);

    this.skillMap.forEach((skillData, index) => {
      this.printSkill(skillData, index);
    });

    if (this.overflowSpecialisations.length) {
      this.printOverflowSpecialisations();
    }
  }
}

export default PrintSkillsService;
