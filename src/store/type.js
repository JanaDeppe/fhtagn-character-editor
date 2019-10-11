// character
const act = {
  // character
  CREATE_NEW_CHARACTER: 'createNewCharacter',
  SET_PROFESSION: 'setProfession',
  TOGGLE_SKILL: 'toggleOptionalSkill',
  NEW_SPECIALISATION: 'newSpecialisation',
  CHANGE_SPECIALISATION: 'changeSpecialisation',
  REMOVE_SPECIALISATION: 'removeSpecialisation',

  // common
  ADD_WARNING: 'addWarning',
  REMOVE_WARNING: 'removeWarning',
  FLUSH_WARNINGS: 'flushWarnings',
};

const get = {
  // character
  PROFESSION_ID: 'professionId',
  PROFESSIONAL_SKILLS: 'professionalSkills',
  OPTIONAL_SKILLS: 'optionalSkills',
  MODIFIED_SKILLS: 'modifiedSkills',
  REDUCED_SKILLS: 'reducedSkills',
  OPTIONAL_SKILL_COUNT: 'optionalSkillCount',
  SKILL_BY_NAME: 'skillByName',
  CALCULATED_SKILL_VALUE_BY_NAME: 'calculatedSkillValueByName',
  CHARACTER_DATA: 'characterData',
  DERIVED_VALUES: 'derivedValues',

  // common
  EDITOR_STEPS: 'editorSteps',
  CURRENT_WARNINGS: 'currentWarnings',
  WARNING_DATA_BY_KEY: 'warningDataByKey',
  APP_VERSION: 'appVersion',

  // rulesystem
  ATTRIBUTE_LIST: 'attributeList',
  SKILL_LIST: 'skillList',
  PROFESSIONAL_SKILLS_BY_ID: 'professionalSkillsById',
  OPTIONAL_SKILLS_BY_ID: 'optionalSkillsById',
  AVAILABLE_OPTIONAL_SKILL_COUNT: 'availableOptionalSkillCount',
  PROFESSION_NAME_BY_ID: 'professionNameById',
};

export { get, act };
